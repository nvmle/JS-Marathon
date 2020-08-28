const $btn = document.getElementById("btn-kick");
const $btnVamp = document.getElementById("btn-kick-vamp");
const $btnFireBall = document.getElementById("btn-kick-fireball");
const $logs = document.querySelector("#logs");
const MAXCLICKCOUNT = 10;

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
  colorProgressbarHP: colorProgressbarHP,
  flashProgressbarHP: flashProgressbarHP,
  renderHPPersons: renderHPPersons,
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
  colorProgressbarHP: colorProgressbarHP,
  flashProgressbarHP: flashProgressbarHP,
  renderHPPersons: renderHPPersons,
};

$btn.addEventListener("click", function () {
  const count = countThunderJolt(1, $btn);
  console.log(`Thunder Jolt нажали ${count} раз(а)`);
  enemy.changeHP(random(20));
  enemy.renderHPPersons();
});

$btnVamp.addEventListener("click", function () {
  const count = countVampThunderJolt(1, $btnVamp);
  console.log(`Vamp Thunder Jolt нажали ${count} раз(а)`);
  const value = random(20);
  character.healHP(Math.round(value / 2));
  enemy.changeHP(value);
  character.renderHPPersons();
  enemy.renderHPPersons();
});

$btnFireBall.addEventListener("click", function () {
  const count = countFireBall(1, $btnFireBall);
  console.log(`Fire Ball нажали ${count} раз(а)`);
  character.changeHP(random(20));
  character.renderHPPersons();
});

function renderHPPersons() {
  this.renderHP();
  this.flashProgressbarHP();
  this.colorProgressbarHP();
}

function renderHP() {
  this.elHP.innerText = this.hp.current + " / " + this.hp.total;
  this.elProgressbarHP.style.width =
    (this.hp.current / this.hp.total) * 100 + "%";
}

function init() {
  const log = `Бой начался!`;
  displayLogs(log);
  // renderHPPersons();
  character.renderHPPersons();
  enemy.renderHPPersons();
}

function changeHP(count) {
  this.hp.current -= count;

  if (this.hp.current <= 0) {
    this.hp.current = 0;
    disableButtons($btn);
    disableButtons($btnFireBall);
    disableButtons($btnVamp);
    const log = `Бедный ${this.name} проиграл бой!`;
    displayLogs(log);
    logRestButtonClickCount();
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
    this.hp.current = this.hp.total;
  }

  //disableButtons($btnVamp);

  const log =
    this === enemy
      ? generateLog(this, character, `+${count}`)
      : generateLog(this, enemy, `+${count}`);

  displayLogs(log);
}

function disableButtons(element) {
  element.disabled = true;
}
const random = (num) => Math.ceil(Math.random() * num);

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

function colorProgressbarHP() {
  temp = this.elProgressbarHP;
  if (this.hp.current <= this.hp.total / 5) {
    temp.classList.add("critical");
  } else if (this.hp.current <= this.hp.total / 2) {
    temp.classList.remove("critical");
    temp.classList.add("low");
  } else {
    temp.classList.remove("low");
  }
}

function flashProgressbarHP() {
  const t = this.elProgressbarHP;
  t.classList.add("flash");
  setTimeout(function () {
    t.classList.remove("flash");
  }, 75);
}

function clickCounter() {
  let clickCount = 0;

  return function (n = 0, button) {
    clickCount += n;
    //console.log(button);
    if (clickCount >= MAXCLICKCOUNT) {
      disableButtons(button);
    }
    return clickCount; //console.log(clickCount);
  };
}
const countThunderJolt = clickCounter();
const countVampThunderJolt = clickCounter();
const countFireBall = clickCounter();

function logRestButtonClickCount() {
  console.log(
    `Thunder Jolt можно было нажать еще ${
      MAXCLICKCOUNT - countThunderJolt(0)
    } раз(а)`
  );
  console.log(
    `Vamp Thunder Jolt можно было нажать еще ${
      MAXCLICKCOUNT - countVampThunderJolt(0)
    } раз(а)`
  );
  console.log(
    `Fire  можно было нажать еще ${MAXCLICKCOUNT - countFireBall(0)} раз(а)`
  );
}
// const t = clickCounter();
// t(0);
// console.log(t(0));
// t(1);
// console.log(t(0));
// t(1);
// console.log(t(0));
// t(1);
// console.log(t(0));
// t(1);
// console.log(t(0));
// t(1);

//console.log($btnFireBall.innerText);

init();
