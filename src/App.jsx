import imgBackground from '@images/index/background.jpg'
import '@styles/app.scss'
import { useState } from 'react'

export default function App() {
  const [contador, setContador] = useState(0)
  const style = {
    backgroundImage: `url(${imgBackground})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }
  return (
    <div style={style} className='welcome'>
      <span>Bienvenido a </span>
      <span>Automatizaciones Formacion</span>
      <p>Desarrollo de aplicativos web para la mejora de las gestiones diarias de la producción.</p>
      <div className='contador'>
        <button
          onClick={()=>{
            setContador(contador+1)
          }}
        >Count</button>
        <p>{contador}</p>
      </div>
    </div>
  )
}
