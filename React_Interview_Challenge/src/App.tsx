import { MouseEventHandler, useState } from 'react';
import './app.css';

export function App() {
  const [list, setList] = useState<{ clientX: number, clientY: number }[]>([]);

  const handleClick = (event: React.MouseEvent) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    console.log(newDot)
    setList((prev) => [...prev, newDot]);
  }

  const handleUndo = (event: React.MouseEvent) => {
    // impede que seja criado um circulo em cima do botão ao clicarmos nele
    event.stopPropagation();
    console.log('undo');
  }

  return (
    <div className='app' onClick={handleClick}>
      <button onClick={handleUndo} >Desfazer</button>
      {list.map((item) =>
        <span
          className='dot'
          style={{ left: `${item.clientX - 25}px`, top: `${item.clientY - 25}px` }} />)}
    </div >
  )
}
