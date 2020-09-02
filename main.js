import Pokemon from "./pokemon.js";
import random from "./utils.js";
import { generateLog } from "./utils.js";
import { generateHealLog } from "./utils.js";
import { clickCounter } from "./utils.js";

const $btn = document.getElementById("btn-kick");
const $btnVamp = document.getElementById("btn-kick-vamp");
const $btnFireBall = document.getElementById("btn-kick-fireball");

const character = new Pokemon({
  name: "Pikachu",
  type: "electric",
  hp: 300,
  selectors: "character",
});

const enemy = new Pokemon({
  name: "Charmander",
  type: "fire",
  hp: 300,
  selectors: "enemy",
});

const countThunderJolt = clickCounter(8, $btn);
$btn.addEventListener("click", function () {
  countThunderJolt(1, $btn);
  enemy.changeHP(random(60, 20), function (count) {
    generateLog(enemy, character, count);
  });
});

const countVampThunderJolt = clickCounter(2, $btnVamp);
$btnVamp.addEventListener("click", function () {
  countVampThunderJolt(1, $btnVamp);
  const value = random(40, 20);
  character.healHP(Math.round(value / 2), function (count) {
    generateHealLog(character, count);
  });
  enemy.changeHP(value, function (count) {
    generateLog(enemy, character, count);
  });
});

const countFireBall = clickCounter(8, $btnFireBall);
$btnFireBall.addEventListener("click", function () {
  countFireBall(1, $btnFireBall);
  character.changeHP(random(60, 20), function (count) {
    generateLog(character, enemy, count);
  });
});
