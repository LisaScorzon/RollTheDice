





export const isValidTransition = (playerSymbol,turn ) => {
    if(playerSymbol === turn ) {
        return true
    } else {
        return false
    }



}

export const calculateWinner = (playerSymbol,score) => {
   if (score >= 18) {
       return playerSymbol
   }
}



export const finished = (score) =>{
    if (score >= 18) {
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