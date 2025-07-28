import { useState } from 'react';
import BD_tipificador from './BD_tipificador.json';
import icon from '../../assets/images/index/iconTerpel.png';

export default function Tipificador() {
  const [formData, setFormData] = useState({
    LINEA_NEGOCIOS: '',
    SEGMENTO: '',
    TIPO_SOLICITUD: '',
    TIPIFICADO: '',
    REQUERIMIENTO: '',
    CRITERIO_DECISION: '',
    nombre: '',
    telefono: '',
    correo: '',
    descripcion: '',
  });

  const getUniqueOptions = (key, filter = {}) => {
    const filtered = BD_tipificador.filter(item =>
      Object.entries(filter).every(([k, v]) => item[k] === v)
    );
    return [...new Set(filtered.map(item => item[key]))];
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'LINEA_NEGOCIOS' && {
        SEGMENTO: '',
        TIPO_SOLICITUD: '',
        TIPIFICADO: '',
        REQUERIMIENTO: '',
        CRITERIO_DECISION: '',
      }),
      ...(name === 'SEGMENTO' && {
        TIPO_SOLICITUD: '',
        TIPIFICADO: '',
        REQUERIMIENTO: '',
        CRITERIO_DECISION: '',
      }),
      ...(name === 'TIPO_SOLICITUD' && {
        TIPIFICADO: '',
        REQUERIMIENTO: '',
        CRITERIO_DECISION: '',
      }),
      ...(name === 'TIPIFICADO' && {
        REQUERIMIENTO: '',
        CRITERIO_DECISION: '',
      }),
      ...(name === 'REQUERIMIENTO' && {
        CRITERIO_DECISION: '',
      }),
    }));
  };

  const fieldLabels = {
    LINEA_NEGOCIOS: "Línea de Negocios",
    SEGMENTO: "Segmento",
    TIPO_SOLICITUD: "Tipo de Solicitud",
    TIPIFICADO: "Tipificación",
    REQUERIMIENTO: "Requerimiento",
    CRITERIO_DECISION: "Criterio de Decisión",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      LINEA_NEGOCIOS: '',
      SEGMENTO: '',
      TIPO_SOLICITUD: '',
      TIPIFICADO: '',
      REQUERIMIENTO: '',
      CRITERIO_DECISION: '',
      nombre: '',
      telefono: '',
      correo: '',
      descripcion: '',
    });
  }

  return (
    <div className="relative flex flex-col w-full h-full p-10">
      <div class="absolute inset-0 z-1 h-full w-full bg-white/60 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_350px_at_50%_350px,#bc6f77,transparent)]"></div></div>
      <div className="relative w-1/2 py-2 mb-8 rounded-r-full shadow-xl bg-gradient-to-br from-secondary to-secondary -left-10">
        <h1 className="text-4xl font-bold ml-14 text-primary">Tipificador</h1>
      </div>
      <div className='absolute flex items-center justify-around w-36 h-10 rounded-l-full shadow-lg top-9 right-[-6rem] bg-gradient-to-br from-secondary to-secondary cursor-pointer hover:right-0' onClick={handleReset}>
        <button><svg className='w-8 fill-[#99000a]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg></button>
        <label className='text-lg font-bold cursor-pointer text-[#99000a]'>Reiniciar</label>
      </div>
      <div className='w-full h-[85%] flex items-center justify-center z-[2]'>
        <div className='w-[90%] h-full flex items-center justify-center '>
          <div className="w-full h-[90%] p-4 space-y-4  md:w-1/2 flex flex-col justify-between">
            {['LINEA_NEGOCIOS', 'SEGMENTO', 'TIPO_SOLICITUD', 'TIPIFICADO', 'REQUERIMIENTO', 'CRITERIO_DECISION'].map((field, idx) => {
              const filter = {};
              if (idx > 0) filter['LINEA_NEGOCIOS'] = formData.LINEA_NEGOCIOS;
              if (idx > 1) filter['SEGMENTO'] = formData.SEGMENTO;
              if (idx > 2) filter['TIPO_SOLICITUD'] = formData.TIPO_SOLICITUD;
              if (idx > 3) filter['TIPIFICADO'] = formData.TIPIFICADO;
              if (idx > 4) filter['REQUERIMIENTO'] = formData.REQUERIMIENTO;
              const options = getUniqueOptions(field, filter);
              return (
                <div key={field}>
                  <label className="p-1 font-semibold text-primary bg-gradient-to-br from-secondary to-secondary w-48 rounded-tr-2xl text-[1.1rem]">{fieldLabels[field]}</label>
                  <div className={`flex shadow-[0px_1px_15px_#4c4c4c] rounded-tr-xl ${options.length > 0 ? 'hover:shadow-[0_2px_10px_rgba(255,0,0,0.5)]' : 'shadow-none'}`}>
                    <img className='w-8' src={icon} alt="icon" />
                    <select
                      name={field}
                      value={formData[field]}
                      onChange={handleSelectChange}
                      className={`w-full p-1 text-sm bg-white outline-none text-[1rem] rounded-tr-xl ${options.length > 0 ? 'cursor-pointer' : ' cursor-not-allowed'}`}
                      disabled={options.length === 0}
                    >
                      <option value="">Selecciona una opción</option>
                      {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full h-[90%] p-4 mt-6 space-y-4  md:w-1/2 md:mt-0 flex flex-col justify-between">
            <div>
              <label className="p-1 font-semibold text-primary bg-gradient-to-br from-secondary to-secondary w-48 rounded-tr-2xl text-[1.1rem]">Nombre</label>
              <div className='relative flex items-center'>
                <svg className='absolute pl-2 w-7 fill-[#99000a]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z" /></svg>
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full p-1 pl-10 outline-none text-[1rem] bg-white rounded-tr-xl border-[1.5px] [border-style:dashed] border-[red] focus:[border-style:solid] focus:shadow-[0_2px_10px_rgba(255,0,0,0.5)] hover:[border-style:solid] shadow-[0px_1px_15px_#4c4c4c]"
                  placeholder="Nombre completo"
                  autoComplete="off"
                  type='text'
                />
              </div>
            </div>
            <div>
              <label className="p-1 font-semibold text-primary bg-gradient-to-br from-secondary to-secondary w-48 rounded-tr-2xl text-[1.1rem]">Teléfono</label>
              <div className='relative flex items-center '>
                <svg className='absolute pl-2 w-7 fill-[#99000a]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                <input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full p-1 pl-10 outline-none text-[1rem] bg-white rounded-tr-xl border-[1.5px] [border-style:dashed] border-[red] focus:[border-style:solid] focus:shadow-[0_2px_10px_rgba(255,0,0,0.5)] hover:[border-style:solid] shadow-[0px_1px_15px_#4c4c4c]"
                  placeholder="3101234567"
                  autoComplete="off"
                  type='number'
                />
              </div>
            </div>
            <div>
              <label className="p-1 font-semibold text-primary bg-gradient-to-br from-secondary to-secondary w-48 rounded-tr-2xl text-[1.1rem]">Correo</label>
              <div className='relative flex items-center'>
                <svg className='absolute pl-2 w-7 fill-[#99000a]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256l0 32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32l0 80 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" /></svg>
                <input
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  className="w-full p-1 pl-10 outline-none text-[1rem] bg-white rounded-tr-xl border-[1.5px] [border-style:dashed] border-[red] focus:[border-style:solid] focus:shadow-[0_2px_10px_rgba(255,0,0,0.5)] hover:[border-style:solid] shadow-[0px_1px_15px_#4c4c4c]"
                  placeholder="correo@ejemplo.com"
                  autoComplete="off"
                  type='email'
                />
              </div>
            </div>
            <div>
              <label className="p-1 font-semibold text-primary bg-gradient-to-br from-secondary to-secondary w-48 rounded-tr-2xl text-[1.1rem]">Descripción</label>
              <div className='relative'>
                <svg className='absolute pl-2 w-7 fill-[#99000a] mt-[0.5rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" /></svg>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-1 pl-10 outline-none text-[1rem] bg-white rounded-tr-xl border-[1.5px] [border-style:dashed] border-[red] focus:[border-style:solid] focus:shadow-[0_2px_10px_rgba(255,0,0,0.5)] hover:[border-style:solid] shadow-[0px_1px_15px_#4c4c4c] resize-none"
                  placeholder="Describe brevemente la tipificación..."
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

