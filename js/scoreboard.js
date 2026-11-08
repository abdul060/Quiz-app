import { getScores } from "./Storage.js";

const TOPIC_NAMES = { capitals: "Capitals", artists: "Artists", sports: "Sports" };
const PLAYER_NAME = "You";


const OTHER_PLAYERS = [
    { name: "Omar", topic: "capitals", score: 4, total: 5 },
    { name: "Andreas", topic: "artists", score: 3, total: 5 },
    { name: "Musti", topic: "sports", score: 5, total: 5 },
];

const latestLabel = document.querySelector(".latest_label");
const latestMessage = document.querySelector(".latest_message");
const latestScore = document.querySelector(".latest_score");
const bestSection = document.querySelector("#best-rounds");
const scoreList = document.querySelector(".score_list");

const topicName = (topic) => TOPIC_NAMES[topic] ?? topic;

const getMessage = ({ score, total }) => {
    const ratio = total > 0 ? score / total : 0;
    if (ratio === 1) return "Perfect score!";
    if (ratio >= 0.6) return "Great job!";
    return "Keep practicing!";
};

const formatDate = (iso) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

const createItem = (round, index) => {
    const item = document.createElement("li");
    item.className = "score_item";

    const rank = document.createElement("span");
    rank.className = "score-item_rank";
    rank.textContent = index + 1;

    const avatar = document.createElement("span");
    avatar.className = "score-item_avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = round.name[0];

    const info = document.createElement("div");
    info.className = "score-item_info";

    const category = document.createElement("p");
    category.className = "score-item_category";
    category.textContent = round.name;

    const date = document.createElement("p");
    date.className = "score-item_date";
    date.textContent = [topicName(round.topic), formatDate(round.date)].filter(Boolean).join(" · ");

    info.append(category, date);

    const badge = document.createElement("span");
    badge.className = "score-item_badge";
    badge.textContent = `${round.score}/${round.total}`;

    item.append(rank, avatar, info, badge);
    return item;
};

const renderLatest = (rounds) => {
    const latest = rounds.at(-1);

    if (!latest) {
        latestLabel.textContent = "No rounds yet";
        latestMessage.textContent = "Play your first round!";
        latestScore.textContent = "–";
        return;
    }

    latestLabel.textContent = `Latest round · ${topicName(latest.topic)}`;
    latestMessage.textContent = getMessage(latest);
    latestScore.textContent = `${latest.score}/${latest.total}`;
};

const renderBest = (rounds) => {
    if (rounds.length === 0) {
        bestSection.hidden = true;
        return;
    }

    const byBest = (a, b) => {
        const diff = b.score / b.total - a.score / a.total;
        return diff !== 0 ? diff : (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0);
    };


    const myBest = { ...[...rounds].sort(byBest)[0], name: PLAYER_NAME };
    const best = [myBest, ...OTHER_PLAYERS].sort(byBest);

    scoreList.replaceChildren(...best.map(createItem));
    bestSection.hidden = false; 
};

const rounds = getScores().filter((round) => round.total > 0);

renderLatest(rounds);
renderBest(rounds);
