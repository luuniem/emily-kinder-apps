let blanks = document.querySelector(".blanks");
let cardOne = document.querySelector(".card-1");
let cardTwo = document.querySelector(".card-2");
let answerCard = document.querySelector(".answer-card");
let cardAnswerText = document.querySelector(".answer-text");
let mathAddForm = document.getElementById("math-add-form");
let inputAnswer = document.getElementById("input-answer");
let inputClass = document.querySelector(".input-class");
let correctAnswer = document.querySelector(".correct-answer");
let wrongAnswer = document.querySelector(".wrong-answer");



function generateNumbers() {
  let blankArray = Array.from({ length: 2 }, () =>
    Math.floor(Math.random() * 5)
  );
  mathAddForm.reset();
  cardOne.classList.add('flipInX');
  cardTwo.classList.add('flipInX');
  answerCard.classList.add('flipInX');

  mathAddForm.style.display = "block";
  cardOne.innerHTML = blankArray[0];
  cardTwo.innerHTML = blankArray[1];
  cardAnswerText.innerHTML = blankArray[0] + blankArray[1];
  inputClass.style.display = "flex";
  correctAnswer.style.display = "none";
  wrongAnswer.style.display = "none";
}

mathAddForm.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log(typeof cardAnswerText.innerHTML);
  if (inputAnswer.value === cardAnswerText.innerHTML) {
    inputClass.style.display = "none";
    correctAnswer.style.display = "flex";
    cardOne.classList.remove('flipInX');
    cardTwo.classList.remove('flipInX');
  } else {
    inputClass.style.display = "none";
    wrongAnswer.style.display = "flex";
    cardOne.classList.add('shake');
    cardTwo.classList.add('shake');
  }
});

function tryAgain() {
  inputClass.style.display = "flex";
  wrongAnswer.style.display = "none";
}

function resetClass(){
  cardOne.classList.remove('flipInX','shake');
  cardTwo.classList.remove('flipInX','shake');
}
