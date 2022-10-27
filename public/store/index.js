let score = 0
let speed = 0

export const store = {
  getScore () {
    return score
  },
  getSpeed() {
    return speed
  },
  setScore(newScore) {
    score = newScore
  },
  setSpeed(newSpeed) {
    speed = newSpeed
  },
  increaseScore(unit) {
    score += unit
  }
}