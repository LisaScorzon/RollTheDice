import React from 'react'
import './Board.css'

export default ({board, makeMove}) => board.map()
  return (
    
    <div>
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || '-'}</button>
  </div>
  )
}

export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
  </div>
)