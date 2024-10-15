const getHumanChoice = () => {
  const hinput = parseInt(
    prompt("Your options:\n1. Rock \n2. Paper \n3. Scissors")
  );
  return hinput === 1
    ? "Rock"
    : hinput === 2
    ? "Paper"
    : hinput === 3
    ? "Scissors"
    : undefined;
};

const getComputerChoice = () => {
  const rand = Math.random();
  return rand <= 0.33 ? "Rock" : rand <= 0.66 ? "Paper" : "Scissors";
};

const playRound = (humanChoice, computerChoice) => {
  const player = humanChoice.toLowerCase();
  const opponent = computerChoice.toLowerCase();
  let isWin = false;

  if (player === "rock") {
    if (opponent === "scissors") {
      isWin = true;
    }
  } else if (player === "paper") {
    if (opponent === "rock") {
      isWin = true;
    }
  } else if (player === "scissors") {
    if (opponent === "paper") {
      isWin = true;
    }
  } else {
    return "your option NA";
  }

  return isWin;
};

const initiateUi = () => {
  const body = document.querySelector("body");

  const btn_rock = document.createElement("button");
  const btn_paper = document.createElement("button");
  const btn_scissors = document.createElement("button");

  const action_div = document.createElement("div");

  btn_rock.setAttribute("id", "rockBtn");
  btn_paper.setAttribute("id", "paperBtn");
  btn_scissors.setAttribute("id", "scissorsBtn");

  btn_rock.textContent = "Rock";
  btn_paper.textContent = "Paper";
  btn_scissors.textContent = "Scissors";

  action_div.appendChild(btn_rock);
  action_div.appendChild(btn_paper);
  action_div.appendChild(btn_scissors);

  const status_div = document.createElement("div");

  const scoreboard = document.createElement("div");
  const player_score = document.createElement("p");
  const computer_score = document.createElement("p");

  const promptboard = document.createElement("div");
  const player_choice = document.createElement("p");
  const computer_choice = document.createElement("p");
  const round_status = document.createElement("p");

  status_div.setAttribute("id", "status_div");

  scoreboard.setAttribute("id", "scoreboard_div");
  player_score.setAttribute("id", "player_score");
  computer_score.setAttribute("id", "computer_score");

  promptboard.setAttribute("id", "promptboard_div");
  player_choice.setAttribute("id", "player_choice");
  computer_choice.setAttribute("id", "computer_choice");
  round_status.setAttribute("id", "round_status");

  player_score.textContent = 0;
  computer_score.textContent = 0;
  player_choice.textContent = "You choose: ";
  computer_choice.textContent = "Computer choose:";
  round_status.textContent = "...";

  status_div.appendChild(scoreboard);
  scoreboard.append(player_score, computer_score);
  promptboard.append(player_choice, computer_choice, round_status);

  const playui = document.createElement("div");
  playui.setAttribute("id", "playui_div");
  playui.append(scoreboard, status_div, promptboard, action_div);

  const gameoverui = document.createElement("div");

  const winneris = document.createElement("p");
  const again = document.createElement("button");

  again.setAttribute("id", "againbtn");
  winneris.setAttribute("id", "winneris");
  gameoverui.setAttribute("id", "gameoverui_div");

  again.textContent = "AGAIN?";
  winneris.textContent = "";

  gameoverui.setAttribute("hidden", "");

  gameoverui.append(winneris, again);

  body.append(playui, gameoverui);
};

let playerScore = 0;
let computerScore = 0;
let isGameOver = false;

initiateUi();

const scoreboard_playerscore = document.querySelector(
  "#scoreboard_div #player_score"
);
const scoreboard_computercore = document.querySelector(
  "#scoreboard_div #computer_score"
);

const promptboard_playerchoice = document.querySelector(
  "#promptboard_div #player_choice"
);
const promptboard_computerchoice = document.querySelector(
  "#promptboard_div #computer_choice"
);
const promptboard_roundstatus = document.querySelector(
  "#promptboard_div #round_status"
);

const playui = document.querySelector("#playui_div");
const gameoverui = document.querySelector("#gameoverui_div");

const winneris = document.querySelector("#winneris");

const newGame = () => {
  isGameOver = false;
  playerScore = 0;
  scoreboard_playerscore.textContent = "Your Score: "+playerScore;
  computerScore = 0;
  scoreboard_computercore.textContent = "Computer Score: "+computerScore;

  gameoverui.setAttribute("hidden", "");
  playui.removeAttribute("hidden");
};
newGame();

const playGame = (playerChoice) => {
  let computerChoice = getComputerChoice();

  promptboard_playerchoice.textContent = `You choose: ${playerChoice} `;
  promptboard_computerchoice.textContent = `Computer choose: ${computerChoice}`;
  if (playerChoice == computerChoice) {
    promptboard_roundstatus.textContent = `Its A Draw`;
  } else {
    const isWin = playRound(playerChoice, computerChoice);
    if (isWin) {
      playerScore += 1;
      scoreboard_playerscore.textContent = "Your Score: "+playerScore;
    } else {
      computerScore += 1;
      scoreboard_computercore.textContent = "Computer Score: "+computerScore;
    }
    const res = !isWin
      ? `You lose! ${computerChoice} beats ${playerChoice}`
      : `You win! ${playerChoice} beats ${computerChoice}`;
    promptboard_roundstatus.textContent = res;
    console.log(promptboard_roundstatus.textContent);
  }

  if ((playerScore >= 5) | (computerScore >= 5)) {
    isGameOver = true;
    winneris.textContent = playerScore > computerScore ? "You Win" : "You Lose";
    return;
  }
};

document.querySelectorAll("button").forEach((v) =>
  v.addEventListener("click", (e) => {
    if (!isGameOver && v.textContent != "AGAIN?") {
      playGame(v.textContent);
    } else {
        
      newGame();
    }
    if (isGameOver) {
      playui.setAttribute("hidden", "");
      gameoverui.removeAttribute("hidden");
    }
  })
);
