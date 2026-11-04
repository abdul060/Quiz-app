import { getCurrentUser , clearCurrentUser , getRank } from "./userStorage.js";
import { initToggles } from "./toggles.js";

const ProfileInitial = document.getElementById("ProfileInitial");
const ProfileName = document.getElementById("ProfileName");
const ProfileInfo = document.getElementById("ProfileInfo");
const GamesPlayedStat = document.getElementById("gamesPlayedStat");
const CorrectAnswerStat = document.getElementById("correctanswerStat");
const LeaderboardStat = document.getElementById("leaderboardStat");
const LogOut = document.getElementById("LogOut");

function showUser(user){
    const { username , gamesPlayed = 0 , correctAnswers = 0 } = user;
    const level = Math.floor(gamesPlayed / 5) + 1;

    ProfileInitial.textContent = username[0].toUpperCase();
    ProfileName.textContent = username;
    ProfileInfo.firstChild.textContent = `@${username} `;
    ProfileInfo.lastChild.textContent = ` Level ${level}`;
    GamesPlayedStat.textContent = gamesPlayed;
    CorrectAnswerStat.textContent = correctAnswers;
    LeaderboardStat.textContent = `#${getRank(username)}`;
}

const user = getCurrentUser();

if(user === null){
    window.location.href = "index.html";
}else{
    showUser(user);
    initToggles();
}

LogOut.addEventListener("click" , function(){
    clearCurrentUser();
    window.location.href = "index.html";
})