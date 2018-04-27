
import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'


export const UPDATE_SCORE ="UPDATE_SCORE"

export const Score = (score) => {
  return ({
    type: UPDATE_SCORE,
    payload: score
  }
  )
}
// let score = 0
// function getRandomNumber(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min;
 
//   score = getRandomNumber(1,7)
//  }

export const updateScore = (gameId,score) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  
  if (isExpired(jwt)) return dispatch(logout())
  
  request
    .patch(`${baseUrl}/games/${gameId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .query( {score })
    //.send({ score })
    .then(_ => dispatch(Score()))
    .catch(err => console.error(err))
    
}



  // dispatch({
  //   type: UPDATE_SCORE,
  //   payload: getRandomNumber(1,7)
  // })






// const numbers= [1,2,3,4,5,6]
 

// const dice1= numbers[Math.floor(Math.random() * numbers.length)]
// const dice2= numbers[Math.floor(Math.random() * numbers.length)]
// const dice3= numbers[Math.floor(Math.random() * numbers.length)]

// let dicetotal = (dice1 + dice2 + dice3);


// console.log('Good roll! your three numbers are : ' +  dice1,  +  dice2,  dice3)
//  console.log('your total is : ' + dicetotal)
 
//  if (dicetotal > 6) {
//     console.log('winner!')
// } else { 
//     console.log('loser!')
// }