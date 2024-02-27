import imgBackground from './assets/images/index/background.jpg'

export default function App() {
  const style = {
    backgroundImage: `url(${imgBackground})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    fontSize: '1.8rem',
    color: '#fff'
  }
  return (
    <div style={style}>
      hola mundo
    </div>
  )
}
