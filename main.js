let blanks = document.querySelector(".blanks");

function generateNumbers() {
  let blankArray = Array.from({ length: 2 }, () =>
    Math.floor(Math.random() * 5)
  );
  let add = blankArray[0] + blankArray[1];
  blanks.innerHTML = `${blankArray[0]} + ${
    blankArray[1]
  } = <span class="answer">${add}</span>`;
}
