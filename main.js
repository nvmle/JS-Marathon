import Pokemon from "./pokemon.js";
import { random, generateLog, clickCounter } from "./utils.js"; //randomPokemon
// import { Game } from "./gameProcess.js";
const $control = document.querySelector(".control");

let dmg;
// async function getPokemonRandom() {
//   const psrpsr = await fetch(
//     "https://reactmarathon-api.netlify.app/api/pokemons?random=true"
//   );
//   const body = await psrpsr.json();
//   return body;
// }

// let randPok;
// async function rP() {
//   await getPokemonRandom().then((data) => {
//     // console.log(data);
//     randPok = data;
//   });
//   console.log(randPok);
// }
// rP();

class Game {
  async getRandomPokemon() {
    const responce = await fetch(
      "https://reactmarathon-api.netlify.app/api/pokemons?random=true"
    );
    const randomPokemon = await responce.json();
    return randomPokemon;
  }

  async getFight(character, enemy, idAttack) {
    const responce = await fetch(
      `https://reactmarathon-api.netlify.app/api/fight?player1id=${character.id}&attackId=${idAttack}&player2id=${enemy.id}`
    );
    // const randomDamage = await fetch(
    //   `https://reactmarathon-api.netlify.app/api/fight?player1id=25&attackId=4&player2id=1`
    // );
    const randomDamage = await responce.json();
    return randomDamage;
  }

  getPokemons = async () => {
    const responce = await fetch(
      "https://reactmarathon-api.netlify.app/api/pokemons"
    );
    const body = await responce.json();
    return body;
  };

  async start() {
    // const $control = document.querySelector(".control");
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

  async newGame() {
    // const pokemons = await this.getPokemons();
    // console.log(pokemons);
    let pokemonRandom = await this.getRandomPokemon();
    console.log(pokemonRandom);
    // let rndPok = randomPokemon();
    // const pokemonCharacter = pokemons.find(
    //   (item) => item.name === pokemonRandom.name
    // ); //"Pikachu"); // rndPok);

    const pokemonCharacter = pokemonRandom;
    const player1 = new Pokemon({
      ...pokemonCharacter,
      selectors: "player1",
    });
    // console.log(player1);

    pokemonRandom = await this.getRandomPokemon();
    // rndPok = randomPokemon();
    // const pokemonEnemy = pokemons.find(
    //   (item) => item.name === pokemonRandom.name
    // ); //rndPok);
    const pokemonEnemy = pokemonRandom;
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
        /*****/
        // dmg = await this.getFight(player1, player2, item.id);
        // console.log(dmg);
        console.log(item);
        onAttackButtonClick(player1, player2, item.id);
        /**** */
        player2.changeHP(random(item.maxDamage, item.minDamage), (count) =>
          generateLog(player2, player1, count)
        );
        countBtn(1);
      });

      $control.appendChild($btn);
    });

    async function onAttackButtonClick(character, enemy, id) {
      const fight = await getFight(character, enemy, id);
      const { kick } = fight;
      console.log(kick);
      // handleAttack(player2, player1, kick.player2); //imported from utils

      // setTimeout(() => {
      //   handleAttack(player1, player2, kick.player1); //imported from utils
      // }, 700);
    }
  }
}

// const $control = document.querySelector(".control");

// let allButtons = document.querySelectorAll(".control .button");
// allButtons.forEach(($item) => $item.remove());
// const $btnStart = document.createElement("button");
// $btnStart.classList.add("button");
// $btnStart.innerText = "Start game!";
// $control.appendChild($btnStart);

// $btnStart.addEventListener("click", () => {
//   allButtons = document.querySelectorAll(".control .button");
//   allButtons.forEach(($item) => $item.remove());
//   newGame();
// });

// function newGame() {
//   let rndPok = randomPokemon();
//   const pokemonCharacter = pokemons.find((item) => item.name === rndPok);
//   const player1 = new Pokemon({
//     ...pokemonCharacter,
//     selectors: "player1",
//   });

//   rndPok = randomPokemon();
//   const pokemonEnemy = pokemons.find((item) => item.name === rndPok);
//   const player2 = new Pokemon({
//     ...pokemonEnemy,
//     selectors: "player2",
//   });

//   player1.attacks.forEach((item) => {
//     const $btn = document.createElement("button");
//     $btn.classList.add("button");
//     $btn.innerText = item.name;
//     const countBtn = clickCounter(item.maxCount, $btn);
//     $btn.addEventListener("click", () => {
//       player2.changeHP(random(item.maxDamage, item.minDamage), (count) =>
//         generateLog(player2, player1, count)
//       );
//       countBtn(1);
//     });

//     $control.appendChild($btn);
//   });
// }

const game = new Game();
game.start();

// $btnRestart.addEventListener("click", () => {
//   allButtons = document.querySelectorAll(".control .button");
//   allButtons.forEach(($item) => $item.remove());
//   newGame();
// });
