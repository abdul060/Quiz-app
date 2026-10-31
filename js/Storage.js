// Shared by the whole group
//THE NAMES (KEYS) WE SAVE DATA UNDER   
const KEYS = {
    scores: "quizScores",
    selectedTopic: "selectedTopic",
};

// READS FROM JSON
// RETURNS THE FALLBACK IF NOTHING IS SAVED OR THE TEXT IS BROKEN

const readJSON = (key, fallback) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
};

// ALL FINISHED ROUNDS
export const getScores = () => readJSON(KEYS.scores, []);

// THE LATEST ROUND, OR UNDEFINED 

export const getLatestScore = () => getScores().at(-1);

// SAVES ONE FINISHED ROUND. 

export const saveScore = ({ topic, score, total }) => {
    const newRound = { topic, score, total, date: new Date().toISOString() };
    const scores = [...getScores(), newRound];
    localStorage.setItem(KEYS.scores, JSON.stringify(scores));
};

// THE TOPIC THE PLAYER PICKED ON THE HOME PAGE
export const saveSelectedTopic = (topic) => {
    localStorage.setItem(KEYS.selectedTopic, topic);
};

export const getSelectedTopic = () => localStorage.getItem(KEYS.selectedTopic);

