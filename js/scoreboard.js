import { getScores } from "./Storage.js";
import { TOPICS } from "./Topics.js";

const latestLabel = document.querySelector(".latest_label");
const latestMessage = document.querySelector(".latest_message");
const latestScore = document.querySelector(".latest_score");
const bestTitle = document.querySelector("#best-title");
const scoreList = document.querySelector(".score_list");

const getMessage = (score, total) => {
  if (score === total) return "Perfect score!";
  if (score >= total / 2) return "Great job!";
  return "Keep practicing!";
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const renderLatest = (round) => {
  if (!round) {
    latestLabel.textContent = "No rounds yet";
    latestMessage.textContent = "Play your first quiz!";
    latestScore.textContent = "-";
    return;
  }

  const { topic, score, total } = round;
  latestLabel.textContent = `Latest round · ${TOPICS[topic].name}`;
  latestMessage.textContent = getMessage(score, total);
  latestScore.textContent = `${score}/${total}`;
};

const renderBest = (rounds) => {
  bestTitle.hidden = rounds.length === 0;

  // newest first, so the newest round wins if two scores are the same
  const best = [...rounds]
    .reverse()
    .sort((a, b) => b.score / b.total - a.score / a.total)
    .slice(0, 4);

  scoreList.innerHTML = best
    .map(({ topic, score, total, date }, i) => {
      const { name } = TOPICS[topic];

      return `
            <li class="score_item">
                <span class="score-item_rank">${i + 1}</span>
                <div class="score-item_avatar">${name[0]}</div>
                <div class="score-item_info">
                    <h3 class="score-item_category">${name}</h3>
                    <p class="score-item_date">${formatDate(date)}</p>
                </div>
                <span class="score-item_badge">${score}/${total}</span>
            </li>
        `;
    })
    .join("");
};

const rounds = getScores().filter(({ topic }) => TOPICS[topic]);

renderLatest(rounds.at(-1));
renderBest(rounds);
