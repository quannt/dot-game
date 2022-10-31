export const GameStatus = {
  Idle: "idle",
  InProgress: "inProgress",
  Paused: "paused",
};

export const newDotIntervalInMs = 1000;

export const dotMinSizeInPixel = 10;

export const dotMaxSizeInPixel = 100;

export const introLocalStorageKey = "dot-game-intro";

export const Sound = {
  Click:
    "https://cdn.glitch.global/38f40edf-b4cd-4ea4-8a6d-011d54640ab1/ui-click.wav?v=1667221650743",
  Plop: "https://cdn.glitch.global/38f40edf-b4cd-4ea4-8a6d-011d54640ab1/plop.wav?v=1667222146571",
  //  Pixel Peeker Polka – faster by Kevin MacLeod | https://incompetech.com/
  //  Music promoted by https://www.chosic.com/free-music/all/
  //  Creative Commons CC BY 3.0
  //  https://creativecommons.org/licenses/by/3.0/
  Background:
    "https://cdn.glitch.global/38f40edf-b4cd-4ea4-8a6d-011d54640ab1/bg-sound.mp3?v=1667222746798",
};

export const guideSteps = [
  {
    hostEl: document.querySelector(".sample-dot"),
    content:
      "Click on a dot to burst it, you get points for doing so! The smaller the dot, the more points you get.",
    top: 91,
    left: -90,
    position: "bottom",
    class: "sample-button-tooltip",
  },

  {
    hostEl: document.querySelector(".header-menu-input .input-wrapper"),
    content: "You can set the speed of the dots using this menu.",
    top: 32,
    left: 7,
    position: "bottom",
  },
  {
    hostEl: document.querySelector(".header-menu .start-button-wrapper"),
    content: "Click on the button to start playing.",
    top: 74,
    left: 7,
    position: "bottom",
  },
];
