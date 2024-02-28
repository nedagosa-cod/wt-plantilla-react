import imgBackground from "@images/index/background.jpg";
import "@styles/app.scss";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";


export default function App() {
  const [contador, setContador] = useState(0);
  const style = {
    backgroundImage: `url(${imgBackground})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  return (
    <div className="app" style={style}>
      <Navbar />
      <div className="welcome">
        <span>Bienvenido a </span>
        <span>Automatizaciones Formación</span>
        <p>
          Desarrollo de aplicativos web para la mejora de las gestiones diarias
          de la producción.
        </p>
        <div className="contador">
          <button
            onClick={() => {
              setContador(contador + 1);
            }}
          >
            Count
          </button>
          <p>{contador}</p>
        </div>
      </div>
    </div>
  );
}
