const questionImage = document.getElementById("question-image");
const photoAuthor = document.getElementById("photo-author");
const photoLicense = document.getElementById("photo-license");
const questionCategory = document.getElementById("question-category");
const questionTitle = document.getElementById("question-title");
const answerList = document.getElementById("answer-list");
const questionNumber = document.getElementById("question-number");
const questionProgress = document.getElementById("question-progress");
const progressCircle = document.querySelector(".progress-value");
const quizScore = document.getElementById("quiz-score");
const quizTime = document.getElementById("quiz-time");
const feedback = document.getElementById("answer-feedback");
const timePopup = document.getElementById("time-popup");
const playAgainButton = document.getElementById("play-again-button");

const CIRCLE_LENGTH = 150.8;

let topic = "";
let questions = [];
let currentIndex = 0;
let question = null;
let score = 0;
let hasAnswered = false;
let quizOver = false;
let timeLeft = 120;
let timerId = null;

async function loadQuiz() {
  const response = await fetch("/json/question.json");
  const data = await response.json();
  topic = data.topic;
  questions = data.questions;
  showQuestion();
  startTimer();
}

function showQuestion() {
  question = questions[currentIndex];
  hasAnswered = false;
  feedback.textContent = "";

  const number = currentIndex + 1;
  const total = questions.length;

  questionNumber.textContent = number;
  questionCategory.textContent = topic + " · Question " + number + " of " + total;
  questionProgress.setAttribute("aria-label", "Question " + number + " of " + total);
  progressCircle.style.strokeDasharray = (number / total) * CIRCLE_LENGTH + " " + CIRCLE_LENGTH;

  questionImage.src = question.image.src;
  questionImage.alt = question.image.alt;
  photoAuthor.textContent = question.image.author;
  photoAuthor.href = question.image.authorUrl;
  photoLicense.textContent = question.image.license;
  photoLicense.href = question.image.licenseUrl;
  questionTitle.textContent = question.question;

  answerList.innerHTML = "";

  for (const answer of question.answers) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer.text;
    button.dataset.answerId = answer.id;
    button.addEventListener("click", function () {
      checkAnswer(button);
    });
    answerList.appendChild(button);
  }
}

function startTimer() {
  showTime();
  timerId = setInterval(function () {
    timeLeft = timeLeft - 1;
    showTime();
    if (timeLeft <= 0) {
      timeIsUp();
    }
  }, 1000);
}

function showTime() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  quizTime.textContent =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function lockButtons() {
  const allButtons = answerList.querySelectorAll(".answer-button");
  for (const button of allButtons) {
    button.disabled = true;
  }
}

function findCorrectButton() {
  return answerList.querySelector(
    '[data-answer-id="' + question.correctAnswerId + '"]'
  );
}

function timeIsUp() {
  if (quizOver) {
    return;
  }
  quizOver = true;
  clearInterval(timerId);
  lockButtons();

  timePopup.hidden = false;
  playAgainButton.focus();
}

function checkAnswer(clickedButton) {
  if (hasAnswered || quizOver) {
    return;
  }
  hasAnswered = true;
  lockButtons();

  if (clickedButton.dataset.answerId === question.correctAnswerId) {
    score = score + 1;
    quizScore.textContent = score;
    clickedButton.classList.add("answer-button--correct");
    feedback.textContent = "Correct!";
  } else {
    clickedButton.classList.add("answer-button--wrong");
    const correctButton = findCorrectButton();
    correctButton.classList.add("answer-button--correct");
    feedback.textContent = "Not quite. The right answer is " + correctButton.textContent + ".";
  }

  setTimeout(goToNextQuestion, 2000);
}

function goToNextQuestion() {
  if (quizOver) {
    return;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex = currentIndex + 1;
    showQuestion();
  } else {
    quizOver = true;
    clearInterval(timerId);
    location.href = "scoreboard.html";
  }
}

playAgainButton.addEventListener("click", function () {
  location.reload();
});

loadQuiz();