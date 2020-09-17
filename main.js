import Pokemon from "./pokemon.js";
import {
  generateLog,
  clickCounter,
  getRandomDamage,
  getRandomPokemon,
} from "./utils.js";

const $control = document.querySelector(".control");

class Game {
  async start() {
    let allButtons = document.querySelectorAll(".control .button");
    allButtons.forEach(($item) => $item.remove());
    const $btnStart = document.createElement("button");
    $btnStart.classList.add("button");
    $btnStart.innerText = "Start game!";
    $control.appendChild($btnStart);

    $btnStart.addEventListener("click", () => {
      allButtons = document.querySelectorAll(".control .button");
      allButtons.forEach(($item) => $item.remove());
      this.newGame();
    });
  }

  async restartBtn() {
    let allButtons = document.querySelectorAll(".control .button");
    const $control = document.querySelector(".control");
    const $btnRestart = document.createElement("button");
    $btnRestart.classList.add("button");
    $btnRestart.innerText = "Restart game!";
    $control.appendChild($btnRestart);

    $btnRestart.addEventListener("click", () => {
      allButtons = document.querySelectorAll(".control .button");
      allButtons.forEach(($item) => $item.remove());
      game.newGame();
    });
  }

  async newGame() {
    let pokemonRandom = await getRandomPokemon(); //this.getRandomPokemon();

    const pokemonCharacter = pokemonRandom;
    const player1 = new Pokemon({
      ...pokemonCharacter,
      selectors: "player1",
      isAlive: 1,
    });

    pokemonRandom = await getRandomPokemon(); //this.getRandomPokemon();
    const pokemonEnemy = pokemonRandom;
    const player2 = new Pokemon({
      ...pokemonEnemy,
      selectors: "player2",
      isAlive: 1,
    });

    player1.attacks.forEach((item) => {
      const $btn = document.createElement("button");
      $btn.classList.add("button");
      $btn.innerText = item.name;
      const countBtn = clickCounter(item.maxCount, $btn);

      $btn.addEventListener("click", async () => {
        const randomDamage = await getRandomDamage(
          //this.getRandomDamage
          player1,
          player2,
          item.id
        );

        player2.changeHP(
          randomDamage.player2,
          (
            count //отображение урона enemy
          ) => {
            generateLog(player2, player1, count);
          }
        );

        player1.changeHP(
          randomDamage.player1,
          (
            count //отображение урона enemy
          ) => {
            generateLog(player1, player2, count);
          }
        );

        countBtn(1);

        if (player1.isAlive === 0 || player2.isAlive === 0) game.restartBtn();
      });

      $control.appendChild($btn);
    });
  }
}

const game = new Game();
game.start();
