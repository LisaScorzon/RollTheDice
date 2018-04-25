import {UPDATE_SCORE} from '../actions/updateScore'

//initialState = []

export default function (state = [], {type, payload}) {
switch (type) {
    case UPDATE_SCORE:
 
    return payload

    default:
    return state
}

}