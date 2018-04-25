





export const isValidTransition = (playerSymbol,turn ) => {
    if(playerSymbol === turn ) {
        return true
    } else {
        return false
    }



}

export const calculateWinner = (scorePlayer1, scorePlayer2) => {
   if (scorePlayer1 >= 18) {
       return 'x'
   } else if 
    (scorePlayer2 >= 18){
        return 'o'
    } else {
        return null
    }
}


export const finished = (scorePlayer1, scorePlayer2) =>{
    if (scorePlayer1 >= 18 || scorePlayer2 >= 18) {
        return true
    } else {
        return false
    }

}
  

    //  export function calculateWinner(score) {
//   let win;
//   if (score >= 18) {
//       return win = true;
//   } else  {
//       return win = false;
//   }
// }