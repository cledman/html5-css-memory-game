const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let totalFlips = 0;

let soundFlip = document.getElementById("soundFlip");
let soundVictory = document.getElementById("soundVictory");
let soundLose = document.getElementById("soundLose");
let soundFinal = document.getElementById("soundFinal");
let button = document.getElementById("reestart");
function flipCard() {
  soundFlip.play();
  if (lockBoard) return;
  if (this === firstCard) return; /*to prevent double click on the same card */

  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkForMatch();
}

function checkForMatch() {
  console.log(totalFlips);
  if (firstCard.dataset.card === secondCard.dataset.card) {
    totalFlips++;
    if (totalFlips < 6) {
      soundVictory.play();
    } else {
      button.classList.add("visible");
      soundFinal.play();
    }
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  soundLose.play();
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let ramdomPosition = Math.floor(Math.random() * 12);
    card.style.order = ramdomPosition;
  });
})();

function reestart() {
  location.reload();
}

function final() {
  soundFinal.play();
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
