import { useRef, useState, useEffect } from "react";

export default function Canvas() {
  
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  // Estado al dibujar
  const [dibujo, setDibujo] = useState(false);
  const [color, setColor] = useState("#000000"); // Color del lapiz
  
  useEffect(() => {
    
    const canvas = canvasRef.current;
    // Tamaño del canvas dependiendo del ancho y largo de la ventana
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.6;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round"; // define como termina la linea con un borde redondo
    ctx.lineWidth = 3;// El grosor del lapiz 
    ctxRef.current = ctx;//contexto guardado en la referencia
  }, []);

  //Funcion que dibujara cuando se presione el mouse
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(
      //posicion XY en el canvas 
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    setDibujo(true); // activar el estado de dibujar
  };
  // Funcion para dibujar mientras se mueva el mouse 
  const draw = (e) => {
    if (!dibujo) return;

    ctxRef.current.strokeStyle = color;// Color actual del lapiz
    ctxRef.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    ctxRef.current.stroke();// Dibuja la linea 
  };
  // Detener el dibujo cuando se suelta el mouse
  const stopDrawing = () => {
    ctxRef.current.closePath();
    setDibujo(false);
  };
  // Para el boton de "limpiar canvas"
  const clearCanvas = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  return (
    <div className="flex flex-col items-center gap-2">
    <div className="border-4 border-black rounded-lg shadow-lg">

      <canvas
        ref={canvasRef}
        
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
      <div className="flex gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={clearCanvas}>🧹 Limpiar</button>
      </div>
    </div>
  );
}
