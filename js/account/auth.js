import { addUser, findUser } from "./userStorage.js";

export async function hashPassword(password) {
  if (!globalThis.crypto?.subtle) {
    return password;
  }
  const bytes = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hashBuffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function loginUser(identifier, password) {
  const user = findUser(identifier);
  if (!user) {
    return { usernameCorrect: false, passwordCorrect: false, user: null };
  }
  const passwordHash = await hashPassword(password);
  return {
    usernameCorrect: true,
    passwordCorrect: passwordHash === user.passwordHash,
    user,
  };
}

export async function registerUser({ username, email, password }) {
  const usernameTaken = Boolean(findUser(username));
  const emailTaken = Boolean(findUser(email));
  if (usernameTaken || emailTaken) {
    return { success: false, usernameTaken, emailTaken };
  }
  const user = {
    username: username.trim(),
    email: email.trim(),
    passwordHash: await hashPassword(password),
    gamesPlayed: 0,
    correctAnswers: 0,
    createdAt: new Date().toISOString(),
  };
  return { success: addUser(user), usernameTaken: false, emailTaken: false };
}
