const getHumanChoice = ()=>{
    const hinput = parseInt(prompt('Your options:\n1. Rock \n2. Paper \n3. Scissors'));
    return hinput===1?"Rock":hinput===2?"Paper":hinput===3?"Scissors":undefined
}

const getComputerChoice = ()=>{
    const rand = Math.random();
    return rand<=(0.33)?"Rock":rand<=(0.66)?"Paper":"Scissors"
}

const playRound = (humanChoice, computerChoice)=>{
    const player = humanChoice.toLowerCase()
    const opponent = computerChoice.toLowerCase()
    let isWin = false

    if (player === 'rock'){
        if(opponent === 'scissors'){
            isWin = true;
        }
    } else if (player === 'paper'){
        if(opponent === 'rock'){
            isWin = true;
        }
    } else if (player === 'scissors'){
        if(opponent === 'paper'){
            isWin = true;   
        }
    } else {
        return 'your option NA'
    }

    return isWin
}

const playGame = ()=>{
    let humanScore = 0
    let computerScore = 0

    for (let i=0; i<5; i++){
        let playerChoice = getHumanChoice()
        let computerChoice = getComputerChoice()
        while(playerChoice===computerChoice){
            console.log(`Draw! ${computerChoice} equal with ${playerChoice}`)
            playerChoice = getHumanChoice()
            computerChoice = getComputerChoice()
        }
        console.log(playerChoice)
        const isWin = playRound(playerChoice, computerChoice);    
        isWin?humanScore+=1:computerScore+=1
        const res = isWin?`You lose! ${computerChoice} beats ${playerChoice}`:`You win! ${playerChoice} beats ${computerChoice}`
        console.log(res)
    }
}

playGame();