import { useState } from 'react';
import './app.css';

export function App() {
  const [list, setList] = useState<{ clientX: number, clientY: number }[]>([]);
  const [undid, setUndid] = useState<{ clientX: number, clientY: number }[]>([]);

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

    if (list.length === 0) {
      return;
    }

    const lastItem = list[list.length - 1];
    setUndid((prev) => [...prev, lastItem]);

    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
  }

  const handleRedo = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (undid.length === 0) {
      return;
    }

    const recoveredDot = undid[undid.length - 1];
    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
    setList((prev) => [...prev, recoveredDot]);
  }

  return (
    <div className='app' onClick={handleClick}>
      <button onClick={handleUndo} >Desfazer</button>
      <button onClick={handleRedo} >Refazer</button>
      {list.map((item, index) =>
        <span
          key={index}
          className='dot'
          style={{ left: `${item.clientX - 25}px`, top: `${item.clientY - 25}px` }}
        />)}
    </div>
  )
}
