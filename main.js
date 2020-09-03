import Pokemon from "./pokemon.js";
import {
  random,
  generateLog,
  // generateHealLog,
  clickCounter,
  randomPokemon,
} from "./utils.js";
import { pokemons } from "./pokemons.js";

const $control = document.querySelector(".control");

let allButtons = document.querySelectorAll(".control .button");
allButtons.forEach(($item) => $item.remove());
const $btnStart = document.createElement("button");
$btnStart.classList.add("button");
$btnStart.innerText = "Start game!";
$control.appendChild($btnStart);

$btnStart.addEventListener("click", () => {
  allButtons = document.querySelectorAll(".control .button");
  allButtons.forEach(($item) => $item.remove());
  newGame();
});

function newGame() {
  let rndPok = randomPokemon();
  const pokemonCharacter = pokemons.find((item) => item.name === rndPok);
  const player1 = new Pokemon({
    ...pokemonCharacter,
    selectors: "player1",
  });

  rndPok = randomPokemon();
  const pokemonEnemy = pokemons.find((item) => item.name === rndPok);
  const player2 = new Pokemon({
    ...pokemonEnemy,
    selectors: "player2",
  });

  player1.attacks.forEach((item) => {
    const $btn = document.createElement("button");
    $btn.classList.add("button");
    $btn.innerText = item.name;
    const countBtn = clickCounter(item.maxCount, $btn);
    $btn.addEventListener("click", () => {
      player2.changeHP(random(item.maxDamage, item.minDamage), (count) =>
        generateLog(player2, player1, count)
      );
      countBtn(1);
    });

    $control.appendChild($btn);
  });
}

// $btnRestart.addEventListener("click", () => {
//   allButtons = document.querySelectorAll(".control .button");
//   allButtons.forEach(($item) => $item.remove());
//   newGame();
// });
