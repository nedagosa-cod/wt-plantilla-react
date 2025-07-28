import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import plantillasData from '@/data/plantillas.json';
import cuaderno from '../../../public/imagenes/cuaderno.gif';

const extraerCamposDesdePlantilla = (texto) => {
    const regex = /{([^}]+)}/g; // Busca cualquier texto entre llaves { }
    const campos = [];
    let match;
    while ((match = regex.exec(texto)) !== null) {
        campos.push(match[1]); // Guarda solo el nombre del campo (sin llaves)
    }
    return [...new Set(campos)]; // Elimina duplicados si hay más de un {nombre}, etc.
};

export default function Plantillas() {
    const [plantillas, setPlantillas] = useState([]);
    const [nota, setNota] = useState(null);
    const [campos, setCampos] = useState([]);
    const [valoresCampos, setValoresCampos] = useState({});
    const [copiado, setCopiado] = useState(false);
    const [descripcionSeleccionada, setDescripcionSeleccionada] = useState('');
    const [selectedTemplateId, setSelectedTemplateId] = useState(null); // Track selected template

    useEffect(() => {
        if (Array.isArray(plantillasData)) {
            setPlantillas(plantillasData);
            if (plantillasData.length > 0) {
                const primeraPlantilla = plantillasData[0];
                const camposDetectados = extraerCamposDesdePlantilla(primeraPlantilla.descripcion || '');
                const valoresIniciales = {};
                camposDetectados.forEach(c => (valoresIniciales[c] = ''));
                // Inicializar contenido con placeholders en rojo
                let contenidoInicial = primeraPlantilla.descripcion || '';
                camposDetectados.forEach(campo => {
                    const regex = new RegExp(`{${campo}}`, 'g');
                    contenidoInicial = contenidoInicial.replace(regex, `<span style="color:red">${campo}</span>`);
                });
                setNota({
                    plantillaOriginal: primeraPlantilla,
                    titulo: primeraPlantilla.titulo || '',
                    contenido: contenidoInicial,
                });
                setCampos(camposDetectados);
                setValoresCampos(valoresIniciales);
                setDescripcionSeleccionada(primeraPlantilla.descripcion || '');
                setSelectedTemplateId(primeraPlantilla.id); // Set initial selected template
            }
        } else {
            setPlantillas([]);
        }
    }, []);

    const handleUsarPlantilla = (plantilla) => {
        const camposDetectados = extraerCamposDesdePlantilla(plantilla.descripcion || '');
        const valoresIniciales = {};
        camposDetectados.forEach(c => (valoresIniciales[c] = ''));
        setCampos(camposDetectados);
        setValoresCampos(valoresIniciales);
        setDescripcionSeleccionada(plantilla.descripcion || '');

        // Inicializar contenido con placeholders en rojo
        let nuevoContenido = plantilla.descripcion || '';
        camposDetectados.forEach(campo => {
            const regex = new RegExp(`{${campo}}`, 'g');
            nuevoContenido = nuevoContenido.replace(regex, `<span style="color:red">${campo}</span>`);
        });

        setNota({
            plantillaOriginal: plantilla,
            titulo: plantilla.titulo || '',
            contenido: nuevoContenido,
        });

        setSelectedTemplateId(plantilla.id); // Update selected template
        setCopiado(false);
    };

    const handleCampoChange = (e, campo) => {
        const nuevoValor = e.target.value;
        const nuevosValores = { ...valoresCampos, [campo]: nuevoValor };
        setValoresCampos(nuevosValores);

        let contenido = nota?.plantillaOriginal.descripcion || '';
        // Reemplazar cada {campo} por su valor o mantener el placeholder en rojo si está vacío
        campos.forEach(key => {
            const regex = new RegExp(`{${key}}`, 'g');
            contenido = contenido.replace(regex, nuevosValores[key] || `<span style="color:red">${key}</span>`);
        });

        setNota(prev => ({ ...prev, contenido }));
        setCopiado(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNota(prev => ({ ...prev, [name]: value }));
        setCopiado(false);
    };

    const handleReiniciarNota = () => {
        const camposDetectados = extraerCamposDesdePlantilla(nota?.plantillaOriginal.descripcion || '');
        const valoresIniciales = {};
        camposDetectados.forEach(c => (valoresIniciales[c] = ''));
        setCampos(camposDetectados);
        setValoresCampos(valoresIniciales);
        setDescripcionSeleccionada(nota?.plantillaOriginal.descripcion || '');

        // Inicializar contenido con placeholders en rojo
        let nuevoContenido = nota?.plantillaOriginal.descripcion || '';
        camposDetectados.forEach(campo => {
            const regex = new RegExp(`{${campo}}`, 'g');
            nuevoContenido = nuevoContenido.replace(regex, `<span style="color:red">${campo}</span>`);
        });

        setNota({
            plantillaOriginal: nota?.plantillaOriginal,
            titulo: nota?.plantillaOriginal.titulo || '',
            contenido: nuevoContenido,
        });

        setCopiado(false);
    };

    const generarTextoFinal = () => {
        let texto = descripcionSeleccionada;
        for (const campo in valoresCampos) {
            const valor = valoresCampos[campo] || '';
            const regex = new RegExp(`{${campo}}`, 'g');
            texto = texto.replace(regex, valor);
        }
        return texto;
    };

    const copiarTexto = async () => {
        if (!nota) return;
        let textoFinal = generarTextoFinal(); // Get the text with replaced placeholders
        // Replace all <br> with \n for newline spacing
        textoFinal = textoFinal.replace(/<br>/g, '\n');
        try {
            await navigator.clipboard.writeText(textoFinal);
            setCopiado(true);
            toast.success('¡Texto copiado al portapapeles!');
            setTimeout(() => setCopiado(false), 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
            toast.error('Error al copiar el texto');
        }
    };

    const todosCamposLlenos = campos.length === 0 || campos.every(c => valoresCampos[c] && valoresCampos[c].trim() !== '');

    return (
        <div className="h-full">
            <Toaster />
            <div className="lg:w-1/2 w-full flex flex-col overflow-y-none mt-3">
                <div className="py-2 w-full bg-gradient-to-br rounded-r-full from-secondary to-secondary mb-8">
                    <h1 className="ml-10 text-4xl font-bold text-primary">Plantillas</h1>
                </div>
            </div>

            <div className="h-[90%] w-[100%] rounded-xl shadow-lg flex flex-row justify-center gap-5 lg:flex-row overflow-hidden mt-auto custom-scroll">
                {/* Left Container: Template Cards with Vertical Scroll */}
                <div className="h-[90%] w-[57%] overflow-y-auto p-4 custom-scroll shadow-lg shadow-black/50 rounded-2xl">
                    <div className="flex flex-wrap justify-center gap-7 justify-items-center">
                        {plantillas.map((plantilla, idx) => (
                            <div
                                key={plantilla.id || idx}
                                className="dato-buscado transition-all duration-200 transform hover:scale-105 hover:shadow-2xl shadow-lg rounded-2xl bg-white dark:bg-neutral-900 border-2 border-primary/20 flex flex-col items-center p-0 overflow-hidden w-full max-w-[300px] h-48 relative group"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none z-0 dark:bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] dark:bg-[size:14px_24px] dark:[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#fff_70%,transparent_110%)]"></div>
                                {selectedTemplateId === plantilla.id && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 z-20 transition-opacity duration-300 group-hover:bg-red-500/30">
                                        <img
                                            src={cuaderno}
                                            alt="Cargando cuaderno"
                                            className="w-24 h-24 object-contain ml-52"
                                        />
                                    </div>
                                )}

                                <CardContent className="w-full flex flex-col items-center p-6 flex-1 justify-between relative z-10">
                                    {plantilla.titulo && (
                                        <CardTitle className="text-center mb-2 text-xl font-extrabold text-primary drop-shadow-sm">
                                            {plantilla.titulo}
                                        </CardTitle>
                                    )}
                                    <Button
                                        className="w-full font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 text-black border-none rounded-lg py-2 px-4 shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center gap-2 dark:from-yellow-500 dark:to-yellow-600 dark:text-white dark:hover:from-yellow-600 dark:hover:to-yellow-700"
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => handleUsarPlantilla(plantilla)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <span className="text-sm md:text-base">Usar esta plantilla</span>
                                    </Button>
                                </CardContent>
                            </div>
                        ))}
                    </div>
                </div>

                {nota && (
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl px-4 sm:px-8 py-6 sm:py-8 overflow-y-auto relative h-[90%] w-[38%] custom-scroll">

                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0 dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)] dark:[background-size:16px_16px] dark:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#fff_70%,transparent_100%)]" />
                        <div className="relative z-10">
                            <div className="text-center mb-4">
                                <h2 className="text-2xl font-extrabold text-primary">Crear nota desde plantilla</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-300">Completa todos los campos para tu nueva nota</p>
                            </div>
                            <div className="flex flex-col gap-6 w-full">
                                {campos.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {campos.map((campo, i) => (
                                            <div key={campo} className="flex flex-col items-center text-center gap-1 w-full">
                                                <label className="font-semibold text-yellow-700" htmlFor={`campo-${i}`}>
                                                    {campo} <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id={`campo-${i}`}
                                                    className="w-{85%} border border-gray-400 bg-slate-100 text-black text-center px-3 py-2 rounded-md shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-600 transition duration-150"
                                                    value={valoresCampos[campo] || ''}
                                                    onChange={e => handleCampoChange(e, campo)}
                                                    placeholder={`Ingrese ${campo.toLowerCase()}`}
                                                    required
                                                />


                                            </div>
                                        ))}
                                    </div>
                                )}


                                <div className="flex flex-col gap-2 w-full">
                                    <label className="font-semibold text-primary" htmlFor="titulo">
                                        Título de la nota
                                    </label>
                                    <input
                                        id="titulo"
                                        className="border-2 border-primary/30 focus:border-primary rounded-lg px-3 py-2 mb-1 outline-none text-lg font-medium placeholder:text-gray-400 transition w-full"
                                        name="titulo"
                                        value={nota.titulo}
                                        onChange={handleChange}
                                        maxLength={50}
                                        placeholder="Ej: Solicitud de puntos, Redención, etc."
                                        autoFocus
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="font-semibold text-primary" htmlFor="contenido">
                                        Contenido de la nota
                                    </label>
                                    <div
                                        id="contenido"
                                        className="border-2 border-primary/30 rounded-lg px-3 py-2 min-h-[100px] max-h-40 overflow-y-auto text-base bg-gray-100 w-full custom-scroll"
                                        style={{ color: 'black', wordBreak: 'break-word' }}
                                        dangerouslySetInnerHTML={{ __html: nota.contenido }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 justify-center mt-6">
                                <button
                                    className={`px-6 py-2 rounded-lg font-semibold transition ${todosCamposLlenos
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    onClick={copiarTexto}
                                    disabled={!todosCamposLlenos}
                                >
                                    {copiado ? '¡Copiado!' : 'Copiar nota'}
                                </button>
                                <button
                                    className="px-6 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white font-semibold transition"
                                    onClick={handleReiniciarNota}
                                >
                                    Reiniciar nota
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}