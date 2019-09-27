let blanks = document.querySelector(".blanks");
let cardOneAdd = document.querySelector(".card-1-add");
let cardTwoAdd = document.querySelector(".card-2-add");
let answerCard = document.querySelector(".answer-card");
let cardAnswerText = document.querySelector(".answer-text");
let mathForm = document.querySelector(".math-add-form");
let inputAnswer = document.getElementById("input-answer");
let inputSubtractionAnswer = document.getElementById(
  "input-subtraction-answer"
);

let inputClass = document.querySelector(".input-class");
let correctAnswer = document.querySelector(".correct-answer");
let wrongAnswer = document.querySelector(".wrong-answer");
let correctSound = new Audio("sounds/correctSound.mp3");
let addPoint = 1;
const pointsList = document.querySelector(".points");

function generateNumbers() {
  mathForm.reset();
  let blankArray = Array.from({ length: 2 }, () =>
    Math.floor(Math.random() * 5 + 1)
  );
  cardAnswerText.innerHTML = blankArray[0] + blankArray[1];
  cardOneAdd.innerHTML = blankArray[0];
  cardTwoAdd.innerHTML = blankArray[1];
  generateStylesFn();
}
// function containing display styles, flip classes, hides input fields when answer is right and wrong. Can be used for any generate buttons such as "New Set"
function generateStylesFn() {
  mathForm.style.display = "block";
  inputClass.style.display = "flex";
  cardOneAdd.classList.add("flipInX");
  cardTwoAdd.classList.add("flipInX");
  answerCard.classList.add("flipInX");
  correctAnswer.style.display = "none";
  wrongAnswer.style.display = "none";
}

//event listener to check user input and correct answer
mathForm.addEventListener("submit", function(e) {
  e.preventDefault();
  if (inputAnswer.value === cardAnswerText.innerHTML) {
    correctAnswerFn();
  } else {
    wrongAnswerFn();
  }
});

//function containing styles and classes for correct answers and adds point.
function correctAnswerFn() {
  inputClass.style.display = "none";
  correctAnswer.style.display = "flex";
  cardOneAdd.classList.remove("flipInX");
  cardTwoAdd.classList.remove("flipInX");
  correctSound.play();
  addOnePoint();
  setTimeout(function() {
    generateNumbers();
  }, 2000);
}

//function containing styles and classes for incorrect answers.
function wrongAnswerFn() {
  inputClass.style.display = "none";
  wrongAnswer.style.display = "flex";
  cardOneAdd.classList.add("shake");
  cardTwoAdd.classList.add("shake");
}

//display input box. call onclick in html markup
function tryAgain() {
  inputClass.style.display = "flex";
  wrongAnswer.style.display = "none";
}

//call onclick in html markup
function removeShakes() {
  cardOneAdd.classList.remove("flipInX", "shake");
  cardTwoAdd.classList.remove("flipInX", "shake");
}

//add 1 point to firebase
function addOnePoint() {
  firebase
    .firestore()
    .collection("Points")
    .add({
      total: addPoint++
    });
}

function renderPoints(reducedPoints) {
  let li = document.createElement("li");
  li.textContent = reducedPoints.reducedPoints;
}

function getPoint() {
  firebase
    .firestore()
    .collection("Points")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;
        let totalArray = [];
        totalArray.push(doc.data().total);
        let reducedPoints = totalArray.reduce(reducer);
        renderPoints(reducedPoints);
      });
    });
}

getPoint();
