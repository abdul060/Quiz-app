const BLUE_SUFFIX = "-blue";
const BLUE_COLOR = "#3B5BDB";

let currentPage = location.pathname.split("/").pop();

if (currentPage === "leaderboard.html") {
  currentPage = "scoreboard.html";
}

const footerLinks = document.querySelectorAll(".footer_list a, .quiz-nav-list a");

for (const link of footerLinks) {
  if (link.getAttribute("href") === currentPage) {
    const icon = link.querySelector("img");
    const label = link.querySelector("span");
    icon.src = icon.getAttribute("src").replace(".png", BLUE_SUFFIX + ".png");
    label.style.color = BLUE_COLOR;
  }
}