// The three topic cards on the home page

import { saveSelectedTopic } from "./Storage.js";
import { getQuizUrl } from "./Topics.js";

// When a card is clicked, remember the topic and go to the questions page
export const setupTopicCards = () => {
  const cards = document.querySelectorAll(".topic-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const { topic } = card.dataset; //destructuring

      saveSelectedTopic(topic);
      window.location.href = getQuizUrl(topic);
    });
  });
};
