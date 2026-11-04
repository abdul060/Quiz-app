import { getScores } from "./Storage.js";

const players = [
    { name: "Maya", points: 48 },
    { name: "Sam", points: 42 },
    { name: "Lisa", points: 39 },
    { name: "Noah", points: 30 },
    { name: "Ella", points: 25 },
    { name: "Omar", points: 22 },
];

const podiumList = document.querySelector(".podium_list");
const playerList = document.querySelector(".player_list");

// all your points from every round you played
const getMyPoints = () => getScores().reduce((sum, { score }) => sum + score, 0);

const renderPodium = ([first, second, third]) => {
    const places = [
        { player: second, place: "second", rank: 2 },
        { player: first, place: "first", rank: 1 },
        { player: third, place: "third", rank: 3 },
    ];

    podiumList.innerHTML = places.map(({ player, place, rank }) => `
        <li class="podium_item podium_item-${place} ${player.name === "You" ? "podium_item-me" : ""}">
            ${rank === 1 ? `<span class="podium_crown" aria-hidden="true">&#9819;</span>` : ""}
            <span class="podium_avatar">${player.name[0]}</span>
            <span class="podium_name">${player.name}</span>
            <div class="podium_block">
                <span class="podium_rank">${rank}</span>
                <span class="podium_points">${player.points} pts</span>
            </div>
        </li>
    `).join("");
};

const renderList = (rest) => {
    const colors = ["blue", "purple"];

    playerList.innerHTML = rest.map((player, i) => {
        const isMe = player.name === "You";
        const color = isMe ? "pink" : colors[i % colors.length];

        return `
            <li class="player_item ${isMe ? "player_item-me" : ""}">
                <span class="player-item_rank">${i + 4}</span>
                <span class="player-item_avatar player-item_avatar-${color}">${player.name[0]}</span>
                <span class="player-item_name">${player.name}</span>
                <span class="player-item_points">${player.points} pts</span>
            </li>
        `;
    }).join("");
};

const allPlayers = [...players, { name: "You", points: getMyPoints() }];
allPlayers.sort((a, b) => b.points - a.points);

renderPodium(allPlayers.slice(0, 3));
renderList(allPlayers.slice(3));
