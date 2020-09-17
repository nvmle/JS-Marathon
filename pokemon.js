class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbarHP = document.getElementById(`progressbar-${name}`);
    this.elImg = document.getElementById(`img-${name}`);
    this.elName = document.getElementById(`name-${name}`);
  }
}
class Pokemon extends Selectors {
  constructor({ name, img, hp, type, selectors, attacks = [], id, isAlive }) {
    super(selectors);

    this.name = name;
    this.img = img;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.id = id;
    this.attacks = attacks;

    this.isAlive = isAlive;

    this.changeImg();
    this.changeName();
    this.renderHPPersons();
  }

  changeImg = () => {
    this.elImg.src = this.img;
  };

  changeName = () => {
    this.elName.innerText = this.name;
  };

  renderHPPersons = () => {
    this.renderHP();
    this.colorProgressbarHP();
    this.flashProgressbarHP();
  };

  renderHP = () => {
    this.elHP.innerText = this.hp.current + " / " + this.hp.total;
    this.elProgressbarHP.style.width =
      (this.hp.current / this.hp.total) * 100 + "%";
  };

  colorProgressbarHP = () => {
    const temp = this.elProgressbarHP;
    if (this.hp.current <= this.hp.total / 5) {
      temp.classList.add("critical");
    } else if (this.hp.current <= this.hp.total / 2) {
      temp.classList.remove("critical");
      temp.classList.add("low");
    } else {
      temp.classList.remove("low");
      temp.classList.remove("critical");
    }
  };

  flashProgressbarHP = () => {
    const t = this.elProgressbarHP;
    t.classList.add("flash");
    setTimeout(function () {
      t.classList.remove("flash");
    }, 75);
  };

  changeHP1 = (count, callback) => {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
      alert(this.name + " проиграл бой!");
      let allButtons = document.querySelectorAll(".control .button");
      allButtons.forEach(($item) => ($item.disabled = true));
      allButtons.forEach(($item) => $item.remove());

      this.isAlive = 0;
    }
    this.renderHPPersons();
    callback && callback(count);
  };

  changeHP = (count, callback) => {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
      this.isAlive = 0;
      alert(this.name + " проиграл бой!");
      let allButtons = document.querySelectorAll(".control .button");
      allButtons.forEach(($item) => ($item.disabled = true));
      allButtons.forEach(($item) => $item.remove());
    }

    this.renderHPPersons();
    callback && callback(count);
  };
}
export default Pokemon;
