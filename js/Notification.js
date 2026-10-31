// notification.js - the notification popup on the home page

import { getLatestScore, saveSelectedTopic } from "./Storage";
import { TOPICS, DEFUALT_TOPIC, getQuizUr1 } from "./Topics";

// Decide what the popup should say
// Gets the latest round (or undefined) and returns the text to show

const createMessage = (latestRound) => {
    // A) Not played yet
    if (!latestRound) {
        return {
            label: "Welcome",
            title: "Welcome to the quiz",
            text: "Play your first round and get on the scoreboard.",
            topic: DEFUALT_TOPIC,
        };
    }


const { topic, score, total } = latestRound;
const { name, next } = TOPICS[topic] ?? { name: topic, next: DEFUALT_TOPIC };

// B) Perfect score => suggest the next topic
if (score === total) {
    return {
    label: "Perfect score", 
    title: "Wow, perfect score!",
    text: `You got ${score}/${total} in ${name}. Ready for ${TOPICS[next].name}`,
    topic: next,
    };
}

// C) Not perfect => try the same topic again
return {
    label: "New challenge",
    title: "Can you beat your score?",
    text: `You got ${score}/${total} in ${name}. Try again and beat it.`,
    topic, 
    };
}; 

// Popup
export const setupNotification = () =>  {
    const bellButton = document.querySelector("#bell-btn")
}