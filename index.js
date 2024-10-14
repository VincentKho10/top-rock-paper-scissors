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

const initiateUi = ()=>{
    const body = document.querySelector('body')
    
    const btn_rock = document.createElement('button')
    const btn_paper = document.createElement('button')
    const btn_scissors = document.createElement('button')
    
    btn_rock.setAttribute('id', 'rockBtn')
    btn_paper.setAttribute('id', 'paperBtn')
    btn_scissors.setAttribute('id', 'scissorsBtn')
    
    btn_rock.textContent = 'Rock'
    btn_paper.textContent = 'Paper'
    btn_scissors.textContent = 'Scissors'
    
    body.appendChild(btn_rock)
    body.appendChild(btn_paper)
    body.appendChild(btn_scissors)
}

initiateUi();

const playGame = (playerChoice)=>{
    let humanScore = 0
    let computerScore = 0
    
    let computerChoice = getComputerChoice()
    console.log(`You choose: ${playerChoice}`)
    if (playerChoice == computerChoice){
        console.log(`Its A Draw ${playerChoice} dont beat ${computerChoice}`)
    }else{
        const isWin = playRound(playerChoice, computerChoice);    
        isWin?humanScore+=1:computerScore+=1
        const res = isWin?`You lose! ${computerChoice} beats ${playerChoice}`:`You win! ${playerChoice} beats ${computerChoice}`
        console.log(res)
    }
}

document.querySelectorAll('button').forEach((v)=>v.addEventListener('click', (e)=>{
    playGame(v.textContent);
}))