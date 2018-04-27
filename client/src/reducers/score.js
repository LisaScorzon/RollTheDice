import {UPDATE_SCORE} from '../actions/updateScore'




export default (state = 0, {type, payload}) => {
    switch (type) {
case UPDATE_SCORE:
        state= state + payload
    //   return {
    //     ...state,
    //     [payload.id]: payload
      
    // }

    default:
    return state
    }


}

// case UPDATE_GAMES:
//       return payload.reduce((games, game) => {
//         games[game.id] = game
//         return games
//       }, {})
//     }
