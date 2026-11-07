const USERS_KEY = "quizUsers";
const CURRENT_USER_KEY = "quizCurrentUser";

export function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    if (Array.isArray(users)) {
      return users;
    }
    return [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  } catch {
    return false;
  }
}

export function addUser(user) {
  return saveUsers([...getUsers(), user]);
}

export function updateUser(username, changes) {
  const users = getUsers().map((user) => {
    if (user.username === username) {
      return { ...user, ...changes };
    }
    return user;
  });
  return saveUsers(users);
}

export function findUser(identifier) {
  const search = identifier.trim().toLowerCase();
  return getUsers().find(({ username, email }) => {
    return username.toLowerCase() === search || email.toLowerCase() === search;
  });
}

export function setCurrentUser(username, remember) {
  clearCurrentUser();
  if (remember) {
    localStorage.setItem(CURRENT_USER_KEY, username);
  } else {
    sessionStorage.setItem(CURRENT_USER_KEY, username);
  }
}

export function getCurrentUser() {
  const username =
    sessionStorage.getItem(CURRENT_USER_KEY) ??
    localStorage.getItem(CURRENT_USER_KEY);
  if (username === null) {
    return null;
  }
  return findUser(username) ?? null;
}

export function clearCurrentUser() {
  sessionStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getRank(username) {
  const sorted = [...getUsers()].sort(
    (a, b) => (b.correctAnswers ?? 0) - (a.correctAnswers ?? 0),
  );
  return sorted.findIndex((user) => user.username === username) + 1;
}

// Call this when a quiz is finished: saveGameResult(numberOfCorrectAnswers)
export function saveGameResult(correctAnswers) {
  const user = getCurrentUser();
  if (user === null) {
    return false;
  }
  return updateUser(user.username, {
    gamesPlayed: (user.gamesPlayed ?? 0) + 1,
    correctAnswers: (user.correctAnswers ?? 0) + correctAnswers,
  });
}
