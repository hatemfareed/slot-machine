// 1. deposit som mony
// 2. Determine number of lines to bet on 
// 3. collect a bet amount
// 4. spin the slot machine
// 5. check if you won or lost
// 6. give the user their winnings
// 7. play again

const prompt = require("prompt-sync")() ;

const ROWS = 3 ;
const COLS = 3 ;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
} ;

const SYMBOLS_VALUES = { // * bet amount
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2 
} ;




const deposit = ()=>{
    while (true){
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount) ;
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount. Please enter a valid amount.")
        }else{
            return numberDepositAmount ;
        }
    }
};

const getNumberOflines = () =>{
    while (true){
        const lines = prompt("Enter the number of lines to bet on (1 - 3): ")
        const numberOfLines = parseFloat(lines) ;
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines. Please enter a valid number of lines.")
        }else{
            return numberOfLines ;
        }
    }
} ;

const getBetAmount = (balance , lines) =>{
    while (true){
        const bet = prompt("Enter the  bet per line:")
        const numberOfBit = parseFloat(bet) ;
        if (isNaN(numberOfBit) || numberOfBit <= 0 || numberOfBit > balance / lines){
            console.log("Invalid bet amount. Please enter a valid bet amount.")
        }else{
            return numberOfBit ;
        }
    }
};

const spin = () =>{
    const symbols = [] ;
    for (const [symbol , count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0 ; i < count ; i++){
            symbols.push(symbol) ;
        }
    }
    const reel = [ [] ,[] ,[] ] ;
    for (let i = 0 ; i < COLS ; i++){
        const reelSymbols = [...symbols] ; // copy of symbols
        for (let j = 0 ; j < ROWS ; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length) ;
            const selectedSymbol = reelSymbols[randomIndex];
            reel[i].push(selectedSymbol) ;
            reelSymbols.splice(randomIndex , 1) ; // remove selected symbol
        }
    }
    return reel ;
} ;

const transpose = (reel) => {
    const rows = [ ] ;
    for (let i = 0 ; i < ROWS ; i++){
         rows.push([]) ;
        for (let j = 0 ; j < COLS ; j++){
            rows[i].push(reel[j][i]) ;
        }
    }
    return rows ;
};

const printRows = (rows) =>{
    for (const row of rows){
        console.log(row.join(" | ")) ;
    }
};

const getWinnings = (rows , betAmount,lines) =>{
    let winnings = 0 ;
    
    for(let i = 0 ; i < lines ; i++){
        let allSame = true ;
        const symbols = rows[i] ;
        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false ;
                break ;
            }

        }
        
        if (allSame == true){
            winnings += SYMBOLS_VALUES[symbols[0]] * betAmount ;
        }

    }
    return winnings ;
};

const game = () =>{
    let balance = deposit();
    while (true){
        console.log("Your Balance: $" + balance.toFixed(2)) ; 
        const numberOfLines =  getNumberOflines() ;
        const bet = getBetAmount(balance , numberOfLines) ;
        balance -= bet * numberOfLines ;
        const reel = spin() ;
        const rows = transpose(reel) ;
        printRows(rows) ;
        const winnings = getWinnings(rows , bet , numberOfLines) ;
        balance += winnings ;
        console.log(`You won $${winnings.toFixed(2)}`) ;

        if (balance <= 0){
            console.log("You lost all your money. Game over!") ;
            break ;
        }
        const playAgain = prompt("Would you like to play again? (y/n): ") ;
        if (playAgain != "y") break ;
        
    }

};

game() ;





