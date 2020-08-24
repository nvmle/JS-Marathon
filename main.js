const $btn = document.getElementById("btn-kick");
const $btnVamp = document.getElementById("btn-kick-vamp");

const character = {
  name: "Pikachu",
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-character"),
  elProgressbarHP: document.getElementById("progressbar-character"),
};

const enemy = {
  name: "Charmander",
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-enemy"),
  elProgressbarHP: document.getElementById("progressbar-enemy"),
};

$btn.addEventListener("click", function () {
  console.log("Kick");
  changeHP(ramdom(20), character);
  changeHP(ramdom(20), enemy);
  renderHP(character);
  renderHP(enemy);
});

$btnVamp.addEventListener("click", function () {
  console.log("Kick");
  const value = ramdom(20);
  changeHP(value, enemy);
  healHP(value, character);
  renderHP(character);
  renderHP(enemy);
});

function init() {
  console.log("Start game");
  renderHP(character);
  renderHP(enemy);
}

function renderHP(person) {
  person.elHP.innerText = person.damageHP + " / " + person.defaultHP;
  person.elProgressbarHP.style.width = person.damageHP + "%";
}

function changeHP(count, person) {
  if (person.damageHP <= count) {
    person.damageHP = 0;
    alert("Бедный " + person.name + " проиграл бой!");
    $btn.disabled = true;
    $btnVamp.disabled = true;
  } else {
    person.damageHP -= count;
  }
}

function healHP(count, person) {
  if (person.damageHP + count >= person.defaultHP) {
    person.damageHP = 100;
  } else {
    person.damageHP += count;
  }
  $btnVamp.disabled = true;

  renderHP(person);
}

function ramdom(num) {
  return Math.ceil(Math.random() * num);
}

init();
