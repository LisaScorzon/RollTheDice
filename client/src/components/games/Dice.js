
import React from 'react'
import PropTypes from 'prop-types'
import './Dice.css'
import { connect } from 'react-redux'
//import { rollDice } from '../../actions/dice'
import { updateGame} from '../../actions/games'
import { updateScore } from '../../actions/updateScore'


 //let score = 0

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
   
    
   }
    //score = getRandomNumber(1,7)
export class Dice extends React.Component {
    
    //updateScore = (score) => this.props.updateScore(score)



  handleClick = (gameId,board) => {
      //this.props.updateScore()
      //updateGame(gameid,board,score)
      let score = getRandomNumber(1,7)
      //console.log(gameid,board, score,"hi")
      console.log(this.props)
      //console.log(getRandomNumber(1,7))
      this.props.updateScore(score)
     alert(score)
    
    return score
  }
  render() {
    const {gameId, board, score, updateScore } = this.props
    return (
      <div className="Dice-div">
      
      <h3>Roll it!</h3>
      <button
        onClick={(gameId, board, score) => this.handleClick(getRandomNumber(1,7))}
        className="Roll-Dice">
    
      </button>
      </div>
      
    )}}
const mapStateToProps = (state) => {
    
}
export default connect(mapStateToProps, { updateGame, updateScore })(Dice)



/*
import React from 'react'
import './Board.css'
const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || '-'}</button>
  )
}
export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
  </div>
)*/