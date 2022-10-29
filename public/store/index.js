import { GameStatus } from "../constant/index.js";

let score = 0;
let speed = 10;
let status = GameStatus.Idle;

export const store = {
  getScore() {
    return score;
  },
  getSpeed() {
    return speed;
  },
  getDifficulty() {
    let difficulty = "";
    if (speed >= 0 && speed < 20) {
      difficulty = "Easy";
    } else if (speed >= 20 && speed < 50) {
      difficulty = "Medium";
    } else {
      difficulty = "Hard";
    }
    return difficulty;
  },
  getStatus() {
    return status;
  },
  setScore(newScore) {
    score = newScore;
  },
  setSpeed(newSpeed) {
    speed = newSpeed;
  },
  increaseScore(unit) {
    score += unit;
  },
  setStatus(newStatus) {
    status = newStatus;
  },
};
