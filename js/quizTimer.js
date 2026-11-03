let deadline = 0;
let timerId = null;
export function startTimer(seconds, updateTimer) {
  stopTimer();
  deadline = Date.now() + seconds * 1000;
  timerId = setInterval(updateTimer, 1000);
  updateTimer();
}
export function getTimeLeft() {
  return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
}
export function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}
