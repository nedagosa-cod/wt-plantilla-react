import "@styles/app.scss";
import { Routes, Route } from "react-router-dom";
import imgBackground from "@images/index/background.jpg";
import Navbar from "./components/Navbar/Navbar";
import Bienvenida from "./components/Bienvenida/Bienvenida";
import Checklist from "./components/Checklist/Checklist";


export default function App() {
  const style = {
    backgroundImage: `url(${imgBackground})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  return (
    <div className="app" style={style}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Bienvenida />} />
        <Route path='/checklist' element={<Checklist />} />
      </Routes>
    </div>
  );
}
