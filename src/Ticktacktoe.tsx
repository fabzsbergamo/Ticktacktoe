import { useState } from 'react'
import './Ticktacktoe.css'

const generateBoard = (size: number) => {
  const newboard =[]
  for(let i =0; i < size; i++)(
    newboard.push([...Array(size)])
  )
  return newboard
}

// horizontal Win
const checkForHorizontalWin = (board: any[][]) => {
  for (let row of board){
    const rowSet = new Set(row)
    if(rowSet.size == 1 && !rowSet.has(undefined)){
      return true
    }
  }
}

// Vertical Win
const rowsToColumns= (board: any[][]) => {
  const newBoard = []
  let column = 0
  while(column < board.length) {
    const newRow = []
    for (let row =0; row < board.length; row++) {
      newRow.push(board[row][column])
    }
    newBoard.push(newRow)
    column++
  }
  return newBoard
}

// Diagnal
const diagnalToRow = (board: any[][]) => {
  const newBoard: any = [[], []]
  let increment= 0
  let decrement = board.length - 1
  while (increment < board.length) {
    newBoard[0].push(board[increment][increment])
    newBoard[1].push(board[increment][decrement])
    increment++
    decrement++
  }
  return newBoard
}

const checkForWin = (board: any[][]) => {
  // horizontal Win
  if (checkForHorizontalWin(board)) {
    return true
  }
  // Vertical Win
  if (checkForHorizontalWin(rowsToColumns(board))){
    return true
  }
  // Diagnal
  if(checkForHorizontalWin(diagnalToRow(board))){
    return true
  }
}



function Ticktacktoe() {
  const [board, setBoard]= useState(generateBoard(3))
  const [currentPlayer, setCurrentPlayer]=useState('x')
 
  const handleClick = (row: number, col: number) => {
    board [row][col] = currentPlayer
    setBoard([...board])
    if (checkForWin(board)){
      console.log(currentPlayer + 'Wins')
        return setCurrentPlayer == null;
    } else {
      setCurrentPlayer(currentPlayer == 'x' ? 'y' : 'x')
    }
  }


  const newGame = () => {
    setBoard(generateBoard(3))
    setCurrentPlayer('x')
  }

    const playerWinsOrNextTurn = (checkForWin(board)) ? 
    <>
    <div>{currentPlayer} wins</div> 
    </> : <div> {currentPlayer}'s turn</div>
 
return (
      <div>
        <div style={{ 
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        display: 'flex',
        color:'red'
      }}>
        <button className="button-64" role="button" onClick={() =>{newGame()}}><span className="text" >New Game</span></button></div>
        <div>
        <div>{playerWinsOrNextTurn}</div>
        </div>
      <div>
        {board.map((row, r) => {
            return(
            <div key={r}
            style={{display: 'flex',}}>
              {row.map((cell, c)=> {
                return ( 
                <div 
                key={c} 
                onClick={() => handleClick(r,c)}
                style={{
                  border: 'solid black 3px',
                  height: '100px', 
                  width: '100px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}> 
                {cell}
            </div>
            )})}
              </div>
            )
          }
        )
      }
      </div>
      </div>
  )
}

export default Ticktacktoe