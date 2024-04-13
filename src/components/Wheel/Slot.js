import Reel from "./Reel.js";
import Symbol from "./Symbol.js";
import '../Game.css';


export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.currentSymbols = [
      ["dollar-icon", "dollar-icon", "dollar-icon"],
      ["dollar-icon", "dollar-icon", "dollar-icon"],
      ["dollar-icon", "dollar-icon", "dollar-icon"],
      ["dollar-icon", "dollar-icon", "dollar-icon"],
      ["dollar-icon", "dollar-icon", "dollar-icon"],
    ];

    this.nextSymbols = [
      ["dollar-icon", "dollar-icon", "dollar-icon"],
      ["dollar-icon", "dollar-icon", "dollar-icon"],
      ["dollar-icon", "dollar-icon", "dollar-icon"],
      ["dollar-icon", "dollar-icon", "dollar-icon"],
      ["dollar-icon", "dollar-icon", "dollar-icon"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx])
    );

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    // this.autoPlayCheckbox = document.getElementById("autoplay");

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;
  }

  spin() {
    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
    ];

    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd(this.nextSymbols));
  }

  onSpinStart(symbols) {
    this.spinButton.disabled = true;

    this.config.onSpinStart?.(symbols);
  }

  onSpinEnd(symbols) {
    this.spinButton.disabled = false;

    this.config.onSpinEnd?.(symbols);

    if (this.autoPlayCheckbox.checked) {
      return window.setTimeout(() => this.spin(), 200);
    }
  }
}

const config = {
  inverted: false
};

const slot = new Slot(document.getElementById("slot"), config);
