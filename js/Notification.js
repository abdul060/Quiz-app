// Notification.js - the notification popup on the home page

import { getLatestScore, saveSelectedTopic } from "./Storage.js";
import { TOPICS, DEFAULT_TOPIC, getQuizUrl } from "./Topics.js";

// Decide what the popup should say
// Gets the latest round (or undefined) and returns the text to show

const createMessage = (latestRound) => {
  // A) Not played yet
  if (!latestRound) {
    return {
      label: "Welcome",
      title: "Welcome to the quiz",
      text: "Play your first round and get on the scoreboard.",
      topic: DEFAULT_TOPIC,
    };
  }

  const { topic, score, total } = latestRound;
  const { name, next } = TOPICS[topic] ?? { name: topic, next: DEFAULT_TOPIC };

  // B) Perfect score => suggest the next topic
  if (score === total) {
    return {
      label: "Perfect score",
      title: "Wow, perfect score!",
      text: `You got ${score}/${total} in ${name}. Ready for ${TOPICS[next].name}?`,
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
export const setupNotification = () => {
  const bellButton = document.querySelector("#bell-btn");
  const overlay = document.querySelector("#modal-overlay");
  const laterButton = document.querySelector("#later-btn");
  const playLink = document.querySelector("#play-now-btn");
  const modalLabel = document.querySelector(".modal__label");
  const modalTitle = document.querySelector(".modal__title");
  const modalText = document.querySelector(".modal__text");

  //Everything on the page except for the popup itself
  const pageBehind = document.querySelectorAll(".app > :not(#modal-overlay)");

  // Put the correct texts into the popup

  const fillPopup = () => {
    const { label, title, text, topic } = createMessage(getLatestScore());

    modalLabel.textContent = label;
    modalTitle.textContent = title;
    modalText.textContent = text;
    playLink.href = getQuizUrl(topic);
    playLink.dataset.topic = topic;
  };

  //Makes the page behind unclickable and skipped by the Tab key,
  // so keyboard users stay inside the popup while it is open

  const setPageBehindInert = (isInert) => {
    pageBehind.forEach((element) => {
      element.inert = isInert;
    });
  };

  const openPopup = () => {
    fillPopup();
    overlay.hidden = false;
    setPageBehindInert(true);
    playLink.focus(); // move keyboard focus into the popup
  };

  const closePopup = () => {
    overlay.hidden = true;
    setPageBehindInert(false);
    bellButton.focus(); // give focus back to the bell
  };

  //Events
  bellButton.addEventListener("click", openPopup);
  laterButton.addEventListener("click", closePopup);

  //click on the dark background closes it
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closePopup();
  });

  //escape key closes it
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) closePopup();
  });

  //remember the topic when "play now" is clicked
  playLink.addEventListener("click", () => {
    saveSelectedTopic(playLink.dataset.topic);
  });
};
