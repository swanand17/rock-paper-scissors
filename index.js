let choices = ["rock", "paper", "scissors"];
let userPlayedFlag = false;
const choiceRock = htmlToElement(
  '<div class="choice choice-rock"><img src="./assets/images/icon-rock.svg" alt="rock"/></div>'
);
const choicePaper = htmlToElement(
  '<div class="choice choice-paper"><img src="./assets/images/icon-paper.svg" alt="paper"/></div>'
);
const choiceScissors = htmlToElement(
  '<div class="choice choice-scissors"><img src="./assets/images/icon-scissors.svg" alt="scissors"/></div>'
);
let playerChoiceContainerHTML = null;
let houseChoiceContainerHTML = null;

let result = "";
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
  playerChoiceContainerHTML = document.getElementById(
    "player-choice-container"
  );
  houseChoiceContainerHTML = document.getElementById("house-choice-container");
  result = document.getElementById("result");
});

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

async function determineWinner(userChoice) {
  let userPlayed = "";
  if (userPlayedFlag) {
    return;
  }
  userPlayed = await userPlays(userChoice);
  userPlayedFlag = true;
  document.getElementById("choices-container").style.display = "none";
  document.getElementById("game-container").style.display = "flex";

  if (userPlayed === "tie") {
    result.innerHTML = "IT'S A TIE";
  } else if (userPlayed) {
    result.innerHTML = "YOU WIN";
    playerChoiceContainerHTML.firstChild.classList.add("winner");
  } else {
    result.innerHTML = "YOU LOSE";
    houseChoiceContainerHTML.firstChild.classList.add("winner");
  }
}

async function userPlays(userChoice) {
  let scoreHTML = document.getElementById("score-number");
  let housePlayed = choices[Math.floor(Math.random() * choices.length)];

  await housePlays(housePlayed);

  switch (userChoice) {
    case "rock":
      playerChoiceContainerHTML.prepend(choiceRock);
      if (housePlayed === "paper") {
        return false;
      } else if (housePlayed === "scissors") {
        score += 1;
        scoreHTML.innerHTML = score;
        return true;
      }
      break;
    case "paper":
      playerChoiceContainerHTML.prepend(choicePaper);
      if (housePlayed === "scissors") {
        return false;
      } else if (housePlayed === "rock") {
        score += 1;
        scoreHTML.innerHTML = score;
        return true;
      }
      break;
    case "scissors":
      playerChoiceContainerHTML.prepend(choiceScissors);
      if (housePlayed === "rock") {
        return false;
      } else if (housePlayed === "paper") {
        score += 1;
        scoreHTML.innerHTML = score;
        return true;
      }
      break;
  }

  if (userChoice === housePlayed) {
    return "tie";
  }
}

function housePlays(housePlayed) {
  switch (housePlayed) {
    case "rock":
      const houseRock = htmlToElement(
        '<div class="choice choice-rock"><img src="./assets/images/icon-rock.svg" alt="rock"/></div>'
      );
      houseChoiceContainerHTML.prepend(houseRock);
      break;
    case "paper":
      const housePaper = htmlToElement(
        '<div class="choice choice-paper"><img src="./assets/images/icon-paper.svg" alt="paper"/></div>'
      );
      houseChoiceContainerHTML.prepend(housePaper);
      break;
    case "scissors":
      const houseScissors = htmlToElement(
        '<div class="choice choice-scissors"><img src="./assets/images/icon-scissors.svg" alt="scissors"/></div>'
      );
      houseChoiceContainerHTML.prepend(houseScissors);
      break;
  }
}

function playAgain() {
  userPlayedFlag = false;
  document.getElementById("choices-container").style.display = "flex";
  document.getElementById("game-container").style.display = "none";
  result.innerHTML = "";

  if (playerChoiceContainerHTML.firstChild.classList.contains("winner")) {
    playerChoiceContainerHTML.firstChild.classList.remove("winner");
  }
  if (houseChoiceContainerHTML.firstChild.classList.contains("winner")) {
    houseChoiceContainerHTML.firstChild.classList.remove("winner");
  }

  playerChoiceContainerHTML.removeChild(playerChoiceContainerHTML.firstChild);
  houseChoiceContainerHTML.removeChild(houseChoiceContainerHTML.firstChild);
}

function showRules() {
  document.getElementById("rules-overlay").style.display = "flex";
}

function closeRules() {
  document.getElementById("rules-overlay").style.display = "none";
}
