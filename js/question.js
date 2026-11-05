import { saveScore } from "./Storage.js";
import { loadQuestions } from "./quizData.js";
import { startTimer, stopTimer, getTimeLeft } from "./quizTimer.js";
const quizMain = document.querySelector(".quiz-main");
const questionPicture = document.getElementById("question-picture");
const questionImage = document.getElementById("question-image");
const questionCategory = document.getElementById("question-category");
const questionTitle = document.getElementById("question-title");
const answerList = document.getElementById("answer-list");
const questionNumber = document.getElementById("question-number");
const questionTotal = document.getElementById("question-total");
const questionProgress = document.getElementById("question-progress");
const progressCircle = document.querySelector(".progress-value");
const quizScore = document.getElementById("quiz-score");
const quizTime = document.getElementById("quiz-time");
const feedback = document.getElementById("answer-feedback");
const retryButton = document.getElementById("retry-button");
const timePopup = document.getElementById("time-popup");
const timePopupText = document.getElementById("time-popup-text");
const playAgainButton = document.getElementById("play-again-button");
const resultsLink = document.getElementById("results-link");
const CIRCLE_LENGTH = 150.8;
const TIME_LIMIT = 120;
const topic = new URLSearchParams(location.search).get("topic") ?? "capitals";
const topicNames = {
  capitals: "Capitals",
  artists: "Artists",
  sports: "Sports",
};
let questions = [];
let currentIndex = 0;
let score = 0;
let hasAnswered = false;
let quizOver = false;
let timeLeft = TIME_LIMIT;
let nextQuestionId = null;
async function loadQuiz() {
  retryButton.hidden = true;
  retryButton.disabled = true;
  feedback.textContent = "";
  questionTitle.textContent = "Loading question…";
  try {
    questions = await loadQuestions(topic);
    document.title = `${topicNames[topic]} - Quiz`;
    showQuestion();
    startTimer(TIME_LIMIT, updateTimer);
  } catch {
    questionPicture.hidden = true;
    quizMain.classList.add("quiz-main--text-only");
    answerList.replaceChildren();
    questionCategory.textContent = "Quiz";
    questionTitle.textContent = "Quiz unavailable";
    feedback.textContent =
      "We couldn't load this quiz. Try again or choose a topic on the home page.";
    retryButton.textContent = "Try again";
    retryButton.hidden = false;
    retryButton.disabled = false;
    questionTitle.focus();
  }
}
function shuffleAnswers(answers) {
  const remaining = [...answers];
  const shuffled = [];
  while (remaining.length > 0) {
    const index = Math.floor(Math.random() * remaining.length);
    shuffled.push(remaining[index]);
    remaining.splice(index, 1);
  }
  return shuffled;
}
function createAnswerButton(answer) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "answer-button";
  button.textContent = answer.text;
  button.dataset.answerId = answer.id;
  return button;
}
function showQuestion() {
  const question = questions[currentIndex];
  const number = currentIndex + 1;
  const total = questions.length;
  hasAnswered = false;
  feedback.textContent = "";
  questionNumber.textContent = number;
  questionTotal.textContent = total;
  questionCategory.textContent = `${topicNames[topic]} · Question ${number} of ${total}`;
  questionProgress.setAttribute("aria-label", `Question ${number} of ${total}`);
  progressCircle.style.strokeDasharray = `${(number / total) * CIRCLE_LENGTH} ${CIRCLE_LENGTH}`;
  questionPicture.hidden = !question.image;
  quizMain.classList.toggle("quiz-main--text-only", !question.image);
  if (question.image) {
    const { src, alt } = question.image;
    questionImage.src = src;
    questionImage.alt = alt;
  }
  questionTitle.textContent = question.question;
  answerList.replaceChildren();
  for (const answer of shuffleAnswers(question.answers)) {
    answerList.appendChild(createAnswerButton(answer));
  }
  questionTitle.focus();
}
function updateTimer() {
  timeLeft = getTimeLeft();
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  quizTime.textContent = `${minutes}:${seconds}`;
  quizTime.dateTime = `PT${timeLeft}S`;
  if (timeLeft === 0) {
    finishQuiz();
  }
}
function lockButtons() {
  for (const button of answerList.children) {
    button.disabled = true;
  }
}
function checkAnswer(event) {
  const clickedButton = event.target.closest(".answer-button");
  if (clickedButton === null || hasAnswered || quizOver) {
    return;
  }
  updateTimer();
  if (quizOver) {
    return;
  }
  hasAnswered = true;
  lockButtons();
  const question = questions[currentIndex];
  let correctText = "";
  for (const button of answerList.children) {
    if (button.dataset.answerId === question.correctAnswerId) {
      button.classList.add("answer-button--correct");
      correctText = button.textContent;
    }
  }
  if (clickedButton.dataset.answerId === question.correctAnswerId) {
    score++;
    quizScore.textContent = score;
    feedback.textContent = "Correct!";
  } else {
    clickedButton.classList.add("answer-button--wrong");
    feedback.textContent = `Not quite. The right answer is ${correctText}.`;
  }
  feedback.focus();
  nextQuestionId = setTimeout(goToNextQuestion, 2000);
}
function goToNextQuestion() {
  if (quizOver) {
    return;
  }
  updateTimer();
  if (quizOver) {
    return;
  }
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}
function finishQuiz() {
  if (quizOver) {
    return;
  }
  quizOver = true;
  stopTimer();
  clearTimeout(nextQuestionId);
  lockButtons();
  saveResult();
}
function saveResult() {
  retryButton.disabled = true;
  try {
    saveScore({ topic, score, total: questions.length });
  } catch {
    questionTitle.textContent = "Quiz finished";
    feedback.textContent = `You scored ${score} out of ${questions.length}. Your result couldn't be saved. Allow browser storage, then try saving again.`;
    retryButton.textContent = "Try saving again";
    retryButton.hidden = false;
    retryButton.disabled = false;
    retryButton.focus();
    return;
  }
  retryButton.hidden = true;
  if (timeLeft === 0) {
    timePopupText.textContent = `Your time is up. You scored ${score} out of ${questions.length}. Your result has been saved.`;
    timePopup.showModal();
    resultsLink.focus();
  } else {
    location.href = "scoreboard.html";
  }
}
function retryQuiz() {
  if (retryButton.disabled) {
    return;
  }
  if (quizOver) {
    saveResult();
  } else {
    loadQuiz();
  }
}
answerList.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
playAgainButton.addEventListener("click", () => location.reload());
timePopup.addEventListener("cancel", (event) => {
  event.preventDefault();
  location.href = "scoreboard.html";
});
loadQuiz();
