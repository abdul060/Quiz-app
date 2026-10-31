// The three topic cards on the home page

import { saveSelectedTopics } from "./Storage";
import { getQuizUr1 } from "./Topics";

// When a card is clicked, remember the topic and go to the questions page
export const setupTopicCards = () => {
    const cards = document.querySelectorAll(".topic-card");

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const { topic } = card.dataset; //destructuring 
            
            saveSelectedTopics(topic);
            window.location.href = getQuizUr1(topic);
        });
    });
};