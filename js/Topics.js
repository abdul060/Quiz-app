// Shared by the whole group

// name = text shown to the player, next = topic to suggest after a perfect score
export const TOPICS = {
    capitals: { name: "Capitals", next: "artists" },
    artists: { name: "Artists", next: "sports"},
    sports: { name: "Sports", next: "capitals"},
};

export const DEFAULT_TOPIC = "capitals"; 

// The adress of the questions for a topic 

export const getQuizUrl = (topic) => `questions.html?topic=${topic}`;