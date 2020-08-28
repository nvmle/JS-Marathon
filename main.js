const $btn = document.getElementById("btn-kick");
const $btnVamp = document.getElementById("btn-kick-vamp");
const $logs = document.querySelector("#logs");

function $getElById(id) {
  return document.getElementById(id);
}

const character = {
  name: "Pikachu",
  type: "electric",
  weakness: ["fighting", "water"],
  resistance: ["steel"],
  hp: {
    current: 100,
    total: 100,
  },
  elHP: $getElById("health-character"),
  elProgressbarHP: $getElById("progressbar-character"),
  renderHP: renderHP,
  changeHP: changeHP,
  healHP: healHP,
};

const {
  name,
  type,
  weakness: [firstWeak, secondWeak],
  resistance: [firstRes],
  hp: { current, total },
} = character;

const enemy = {
  name: "Charmander",
  type: "fire",
  weakness: ["fighting", "water"],
  resistance: ["steel"],
  hp: {
    current: 100,
    total: 100,
  },
  elHP: $getElById("health-enemy"),
  elProgressbarHP: $getElById("progressbar-enemy"),
  renderHP: renderHP,
  changeHP: changeHP,
  healHP: healHP,
};

$btn.addEventListener("click", function () {
  console.log("Kick");
  character.changeHP(random(20));
  enemy.changeHP(random(20));
  renderHPPersons();
  flashProgressbarHP();
});

$btnVamp.addEventListener("click", function () {
  console.log("Kick Vamp");
  const value = random(20);
  character.healHP(value);
  enemy.changeHP(value);
  renderHPPersons();
});

function renderHPPersons() {
  character.renderHP();
  enemy.renderHP();
}

function renderHP() {
  this.elHP.innerText = this.hp.current + " / " + this.hp.total;
  this.elProgressbarHP.style.width =
    (this.hp.current / this.hp.total) * 100 + "%";
}

function init() {
  console.log("Start game");
  renderHPPersons();
}

function changeHP(count) {
  this.hp.current -= count;

  if (this.hp.current <= 0) {
    this.hp.current = 0;
    alert("Бедный " + this.name + " проиграл бой!");
    $btn.disabled = true;
    $btnVamp.disabled = true;
  }

  const log =
    this === enemy
      ? generateLog(this, character, `-${count}`)
      : generateLog(this, enemy, `-${count}`);

  displayLogs(log);
}

function healHP(count) {
  this.hp.current += count;

  if (this.hp.current >= this.hp.total) {
    this.hp.current = 100;
  }

  $btnVamp.disabled = true;

  const log =
    this === enemy
      ? generateLog(this, character, `+${count}`)
      : generateLog(this, enemy, `+${count}`);

  displayLogs(log);
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson, damage) {
  const logs = [
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага ${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага ${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил ${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар ${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком <вырезанно цензурой> противника ${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар ${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар ${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника ${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника ${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику ${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
  ];

  return logs[random(logs.length) - 1];
}

function displayLogs(log) {
  const $p = document.createElement("p");
  $p.innerText = log;
  $logs.insertBefore($p, $logs.children[0]);
}

init();
