
import React from 'react'
import PropTypes from 'prop-types'
//import './Dice.css'
import { connect } from 'react-redux'
//import { rollDice } from '../../actions/dice'
import { updateGame} from '../../actions/games'


function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
   }
export class Dice extends React.Component {


  handleClick = (gameid,board) => {
      updateGame(gameid,board)
      console.log(gameid,board,"hi")
      
    
  }
  render() {
    const {gameid, board } = this.props
    return (
      <div className="Dice-div">
      <h3>Roll it!</h3>
      <button
        onClick={this.handleClick}
        className="Roll-Dice">click
      </button>
      </div>
    )}}
const mapStateToProps = ({resultdice}) => ({resultdice})
export default connect(mapStateToProps, { updateGame })(Dice)