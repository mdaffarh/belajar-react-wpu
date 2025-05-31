/* eslint-disable react/prop-types */
import { useState } from "react"

function Square({value, onSquareClick}){

  // event handler in onclick
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board ({xIsNext, squares, onPlay}) {

  function handleClick(i){
    // kalau ada isinya jangan jalanin ini
    if (squares[i] || calculateWinner(squares)) return;

    // buat array baru dan ubah kotak yang diclick
    const nextSquares = squares.slice();
    nextSquares[i] = (xIsNext) ? 'X' : 'O';

    onPlay(nextSquares);
  }

  // cek state permainan
  const winner = calculateWinner(squares);
  // Di dalam Board:
  let status = '';
  if(winner){
    status = 'Winner: ' + winner;
  } else if (squares.every(Boolean)) { // Memeriksa apakah semua kotak terisi (tidak null)
    status = 'It\'s a Draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }



  return (
      <>
        <div className="status">
          {status}
        </div>
        <div className="board">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
      </>
  )
}

// outer component
export default function Game(){
  // * state untuk turn (), ga dipake lagi karena udah ada logic cari turn yang lain
  // const [xIsNext, setXIsNext] = useState(true);

  // array of state dari keadaan game (history)
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // state untuk move siapa (buat time travel)
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;

  // ambil keadaan terahir
  const currentSquares = history[currentMove];

  // lompat ke move berapa
  function jumpTo(nextMove){
    setCurrentMove(nextMove);

    // karena pertama pasti X maka move genap X dan ganjil O
    // setXIsNext(nextMove % 2 === 0);
  }

  // dijalankan ketika onPlay pada board dipanggil
  function handlePlay(nextSquares){
    // slice history dari 0 ke move tujuan pindah
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // spread operator, copy dan menambahkan
    setHistory(nextHistory)

    // ubah currentMove ketika melakukan time travel
    setCurrentMove(nextHistory.length - 1);

    // ubah player
    // setXIsNext(!xIsNext)
  }

  // buat button history
  const moves = history.map((squares, move ) => {
    let description = '';
    if(move > 0){
      description = 'Go to move #' + move;
    }else{
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });


  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{
          moves
          }</ol>
      </div>
    </div>
  )
}

// cek keadaan board setiap jalan
function calculateWinner(squares){
  // keadaan menang
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // cek
  for (let i = 0; i < lines.length; i++) {
    // destructuring
    const [a, b, c] = lines[i];

    // cek apakah ada isinya
    if (squares[a] == squares[b] && squares[b] == squares[c]) {
        return squares[a];
    }
  }

  // default
  return null;
}