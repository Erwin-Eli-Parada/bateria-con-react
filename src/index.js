//importación de los hooks
import ReactDOM from 'react-dom/client';
import {useState, createContext, useContext} from 'react';
import "./styles.css";
//Contexto
const SoundContext = createContext();

function SoundContextProvider(props){
  const [texto, setTexto] = useState("");
  const [encendido, setEncendido] = useState(false);
  const [volumen, setVolumen] = useState(10);

  return(
    <SoundContext.Provider value={{
        texto,
        setTexto,
        encendido,
        setEncendido,
        volumen,
        setVolumen
      }}>
      {props.children}  
    </SoundContext.Provider>
  );
}

//componente panel
function Panel(props){
  return(
    <div className="panel">
      <Drumpad letra="Q" sonido="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" texto="Heater1"/>
      <Drumpad letra="W" sonido="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" texto="Heater2"/>
      <Drumpad letra="E" sonido="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" texto="Heater3"/>
      <Drumpad letra="A" sonido="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" texto="Heater4"/>
      <Drumpad letra="S" sonido="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" texto="Clap"/>
      <Drumpad letra="D" sonido="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" texto="Open-HH"/>
      <Drumpad letra="Z" sonido="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" texto="Kick-n'-Hat"/>
      <Drumpad letra="X" sonido="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" texto="Kick"/>
      <Drumpad letra="C" sonido="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" texto="Closed-HH"/>
    </div>
  );
}

  //componente drumpat
function Drumpad(props){
  const letra=props.letra;
  const sonido=props.sonido;
  const texto=props.texto;
//   let sound= new Audio(sonido);
//   console.log(letra,sonido);

  const {setTexto, encendido, volumen}=useContext(SoundContext);
  if(!encendido){
    return(
        <button id={letra+"btn"} className="drum-pad">
            <audio src={sonido} className="clip" id={letra} volume={volumen}></audio>
            {letra}
        </button>
    );
  }else{
    return(
        // <button id={letra} class="drum-pad" onClick={async(e)=>{
        //     setTexto(texto);
        //     return await sound.play()
        // }}>
        <button id={letra+"btn"} className="drum-pad" onClick={e=>{
            setTexto(texto);
            const elementoSonido = document.getElementById(letra);
            elementoSonido.play();
            console.log(e.target.id);
        }}>
            <audio src={sonido} className="clip" id={letra} volume={.31}></audio>
            {letra}
        </button>
    );
  }
}

//componente mostrador
function Mostrador(props){
  
  const {texto, setEncendido, encendido}=useContext(SoundContext);

  return(
    <div className='mostrador'>
  {/* componente encendido */}
        <label className="botoncito">
            <input type="checkbox" onChange={e=>{
                setEncendido(!encendido);
            }}/>
            <span className="deslizadora"></span>
        </label>
  {/* componente display */}
        <div id="display">{texto}</div>
  {/* componente volumen */}
        <input type="range" id="volume" min={0} max={1} step={0.01}/>
    </div>
  );
}

//componente principal
const root= ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <SoundContextProvider>
    <div id="drum-machine" onKeyDown={onKeyDownHandler}>
      <h1>FCC</h1>
      <div>
        <Panel/>
        <Mostrador/>
      </div>
    </div>
  </SoundContextProvider>
);

//función para saber que tecla fue presionada
function onKeyDownHandler(event) {
    var codigo = event.which || event.keyCode;
    let letra="";
    console.log("Presionada: " + codigo); 
    if(codigo >= 65 && codigo <= 90){
      console.log(String.fromCharCode(codigo));
      letra=String.fromCharCode(codigo);
    }
    
    if(letra==="Q" || letra==="W" || letra==="E" || letra==="A" || letra==="S" || letra==="D" || letra==="Z" || letra==="X" || letra==="C"){
        let btn=document.getElementById(letra+"btn");
        btn.click();
    }
}

