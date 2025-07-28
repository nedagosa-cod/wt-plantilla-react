import { User, Lock, Users, FileText, Hash, X } from "lucide-react"

export default function Informacion({showPopupInfo, setShowPopupInfo}) {
  // Datos de ejemplo para las cards de usuarios
  const userCards = [
    {
      id: 1,
      usuario: "CLIBERACI",
      contraseña: "Colombia2025**Terpel",
    },
    {
      id: 2,
      usuario: "CLIBERACI1",
      contraseña: "Colombia2025**Terpel",
    },
    {
      id: 3,
      usuario: "CLIBERACI2",
      contraseña: "Colombia2025**Terpel",
    },
  ]

  // Datos de ejemplo para las cards de clientes
  const clientCards = [
    {
      id: 1,
      cliente: "ESTACION DE SERVICIO LA FRAGUA LTDA",
      solicitante: "10004591",
      observacion:
        "Debemos llamar a Juan Zambrano como filtro, antes de llamarlo validar el estado de la cartera",
    },
    {
      id: 2,
      cliente: " JUANCAMAR Y CIA S EN C",
      solicitante: "10000410",
      observacion:
        "Debemos llamar a Juan Zambrano como filtro, antes de llamarlo validar el estado de la cartera",
    },
  ]

  return (
    <div className="bg-gris p-8 overflow-y-auto max-h-[70vh] xl:max-h-none">
      <div className="max-w-7xl mx-auto space-y-8">
        <button
          onClick={() => {setShowPopupInfo(false);}}
          className="absolute top-10 right-10 z-10 p-2 bg-primary hover:bg-primaryDark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          title="Cerrar"
        >
          <X className="w-16 h-16 group-hover:rotate-90 transition-transform duration-200" />
        </button>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground/80 mb-2">USUARIOS</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {userCards.map((card) => (
            <div
              key={card.id}
              className="bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 hover:border-secondary group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/40 transition-colors">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Usuario #{card.id}</span>
                </div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              </div>

              <div className="mb-4">
                <label className="flex items-center space-x-2 text-sm font-medium text-foreground/60 mb-2">
                  <User className="w-4 h-4" />
                  <span>Usuario</span>
                </label>
                <div className="bg-gris rounded-lg p-3 border border-slate-200">
                  <span className="text-foreground/80 font-mono text-sm">{card.usuario}</span>
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-foreground/60 mb-2">
                  <Lock className="w-4 h-4" />
                  <span>Contraseña</span>
                </label>
                <div className="bg-gris rounded-lg p-3 border border-slate-200">
                  <span className="text-foreground/80 font-mono text-sm tracking-wider">{card.contraseña}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mb-8 mt-12">
          <h2 className="text-3xl font-bold text-foreground/80 mb-2">NOVEDAD - CLIENTES</h2>
          <div className="w-32 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clientCards.map((card) => (
            <div
              key={card.id}
              className="bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 hover:border-secondary group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/40 transition-colors">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Cliente #{card.id}</span>
                </div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              </div>

              <div className="mb-4">
                <label className="flex items-center space-x-2 text-sm font-medium text-foreground/60 mb-2">
                  <Users className="w-4 h-4" />
                  <span>Cliente</span>
                </label>
                <div className="bg-gris rounded-lg p-3 border border-slate-200">
                  <span className="text-foreground font-semibold text-sm">{card.cliente}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center space-x-2 text-sm font-medium text-foreground/60 mb-2">
                  <Hash className="w-4 h-4" />
                  <span>Solicitante</span>
                </label>
                <div className="bg-secondary/10 rounded-lg p-3 border border-secondary">
                  <span className="text-secondary font-mono text-lg font-bold tracking-wider">{card.solicitante}</span>
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-foreground/60 mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Observación</span>
                </label>
                <div className="bg-gris rounded-lg p-4 border border-slate-200 max-h-32 overflow-y-auto">
                  <p className="text-foreground/70 text-sm leading-relaxed">{card.observacion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
