var currQuestion, questionTotal, score;
var questions, currAnswerList, currAnswers, currAnswerTotal, currQuestionDisplay, questionTotalDisplay, nextQuestionBtn;

function assessAnswer() {
  for (var i = 0; i < currAnswerTotal; i++) {
    currAnswers[i].removeEventListener("click", assessAnswer)
  }
  if (this.className == "wrongAnswer") {
    this.className = "wrongAnswerRevealed";
    answerRightOrWrongDisplay.innerText = "Wrong!";
    for (var j = 0; j < currAnswerTotal; j++) {
      if (currAnswers[j].className == "rightAnswer") {
        currAnswers[j].className = "rightAnswerRevealed"
      }
    }
  }
  if (this.className == "rightAnswer") {
    this.className = "rightAnswerRevealed";
    answerRightOrWrongDisplay.innerText = "Correct!";
    score++;
    scoreDisplay.innerText = score
  }
  if (currQuestion == questionTotal - 1) {
    nextQuestionBtn.innerText = "Wrap Up"
  }
  nextQuestionBtn.disabled = false
} 

function showNextQuestion() {
  questions[currQuestion].style.display = "initial";
  var noAnswerList = true;
  var j = 0;
  while (noAnswerList && j < questions[currQuestion].childNodes.length) {
    if (questions[currQuestion].childNodes[j].className == "answerList") {
      currAnswerList = questions[currQuestion].childNodes[j];
      noAnswerList = false
    }
    j++
  }
  currAnswers = currAnswerList.childNodes;
  currAnswerTotal = currAnswers.length;
  for (var i = 0; i < currAnswerTotal; i++) {
    currAnswers[i].addEventListener("click", assessAnswer)
  }
  answerRightOrWrongDisplay.innerText = "Standing by.";
  currQuestionDisplay.innerText = currQuestion + 1;
  questionTotalDisplay.innerText = questionTotal;
  scoreDisplay.innerText = score;
}

function quizConclude() {
  var finalScoreString = score + " questions";
  if (score == 1) {
    finalScoreString = finalScoreString.substr(0, finalScoreString.length - 1)
  }
  document.getElementById("finalScore").innerText = finalScoreString;
  document.getElementById("finalTotal").innerText = questionTotal;
  document.getElementById("quizEnd").style.display = "initial"
}

function proceedToNextQuestion() {
  questions[currQuestion].style.display = "none";
  currQuestion++;
  nextQuestionBtn.disabled = true;
  if (currQuestion < questionTotal) {
    showNextQuestion()
  } else {
    quizConclude()
  }
}

function quizInitialize() {

  questions = document.getElementsByClassName("question");
  answerRightOrWrongDisplay = document.getElementById("answerRightOrWrong");
  currQuestionDisplay = document.getElementById("currQuestionNumber");
  questionTotalDisplay = document.getElementById("totalNumberOfQuestions");
  scoreDisplay = document.getElementById("score");
  nextQuestionBtn = document.getElementById("nextQuestionButton");

  currQuestion = 0;
  questionTotal = questions.length;
  score = 0;

  nextQuestionBtn.addEventListener("click", proceedToNextQuestion);
  showNextQuestion()

}

function reviewAnswers() {
  for (var i = 0; i < questionTotal; i++) {
    questions[i].style.display = "initial";
  }
}
