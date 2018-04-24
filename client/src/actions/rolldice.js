
const rollDice = games => ({
    type: ROLL_DICE,
    payload: diceScore
  })


const numbers= [1,2,3,4,5,6]
 

const dice1= numbers[Math.floor(Math.random() * numbers.length)]
const dice2= numbers[Math.floor(Math.random() * numbers.length)]
const dice3= numbers[Math.floor(Math.random() * numbers.length)]

let dicetotal = (dice1 + dice2 + dice3);


console.log('Good roll! your three numbers are : ' +  dice1,  +  dice2,  dice3)
 console.log('your total is : ' + dicetotal)
 
 if (dicetotal > 6) {
    console.log('winner!')
} else { 
    console.log('loser!')
}