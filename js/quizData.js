export async function loadQuestions(topic) {
  if (!["capitals", "artists", "sports"].includes(topic)) {
    throw new Error("Unknown topic");
  }
  const response = await fetch(`../json/${topic}.json`);
  if (!response.ok) {
    throw new Error("Questions unavailable");
  }
  const { questions } = await response.json();
  if (questions.length === 0) {
    throw new Error("No questions found");
  }
  for (const question of questions) {
    if (typeof question.correctAnswerId !== "string") {
      throw new Error("The correct answer ID must be a string");
    }
  }
  return questions;
}
