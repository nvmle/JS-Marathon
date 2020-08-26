const $btn = document.getElementById("btn-kick");
const $btnVamp = document.getElementById("btn-kick-vamp");

const character = {
  name: "Pikachu",
  defaultHP: 200,
  damageHP: 200,
  elHP: document.getElementById("health-character"),
  elProgressbarHP: document.getElementById("progressbar-character"),
  renderHP: renderHP,
  changeHP: changeHP,
  healHP: healHP,
};

const enemy = {
  name: "Charmander",
  defaultHP: 150,
  damageHP: 150,
  elHP: document.getElementById("health-enemy"),
  elProgressbarHP: document.getElementById("progressbar-enemy"),
  renderHP: renderHP,
  changeHP: changeHP,
  healHP: healHP,
};

$btn.addEventListener("click", function () {
  console.log("Kick");
  character.changeHP(ramdom(20));
  enemy.changeHP(ramdom(20));
  renderHPPersons();
});

$btnVamp.addEventListener("click", function () {
  console.log("Kick Vamp");
  const value = ramdom(20);
  enemy.changeHP(value);
  character.healHP(value);
  renderHPPersons();
});

function renderHPPersons() {
  character.renderHP();
  enemy.renderHP();
}

function renderHP() {
  this.elHP.innerText = this.damageHP + " / " + this.defaultHP;
  this.elProgressbarHP.style.width =
    (this.damageHP / this.defaultHP) * 100 + "%";
}

function init() {
  console.log("Start game");
  renderHPPersons();
}

function changeHP(count) {
  if (this.damageHP <= count) {
    this.damageHP = 0;
    alert("Бедный " + this.name + " проиграл бой!");
    $btn.disabled = true;
    $btnVamp.disabled = true;
  } else {
    this.damageHP -= count;
  }
}

function healHP(count) {
  if (this.damageHP + count >= this.defaultHP) {
    this.damageHP = 100;
  } else {
    this.damageHP += count;
  }
  $btnVamp.disabled = true;
}

function ramdom(num) {
  return Math.ceil(Math.random() * num);
}

init();
