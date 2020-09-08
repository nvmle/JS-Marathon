class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbarHP = document.getElementById(`progressbar-${name}`);
    this.elImg = document.getElementById(`img-${name}`);
    this.elName = document.getElementById(`name-${name}`);
  }
}
class Pokemon extends Selectors {
  constructor({ name, img, hp, type, selectors, attacks = [], id }) {
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
    this.flashProgressbarHP();
    this.colorProgressbarHP();
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
    }
  };

  flashProgressbarHP = () => {
    const t = this.elProgressbarHP;
    t.classList.add("flash");
    setTimeout(function () {
      t.classList.remove("flash");
    }, 75);
  };

  changeHP = (count, callback) => {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
      alert(this.name + " проиграл бой!");
      let allButtons = document.querySelectorAll(".control .button");
      allButtons.forEach(($item) => ($item.disabled = true));
      allButtons.forEach(($item) => $item.remove());

      const $control = document.querySelector(".control");
      const $btnRestart = document.createElement("button");
      $btnRestart.classList.add("button");
      $btnRestart.innerText = "Restart game!";
      $control.appendChild($btnRestart);

      // $btnRestart.addEventListener("click", () => {
      //   allButtons = document.querySelectorAll(".control .button");
      //   allButtons.forEach(($item) => $item.remove());
      //   newGame();
      // });
    }
    this.renderHPPersons();
    callback && callback(count);
  };

  // healHP = (count, callback) => {
  //   this.hp.current += count;

  //   if (this.hp.current >= this.hp.total) {
  //     this.hp.current = this.hp.total;
  //   }
  //   this.renderHPPersons();
  //   callback && callback(count);
  // };
}
export default Pokemon;
