class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbarHP = document.getElementById(`progressbar-${name}`);
  }
}
class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors }) {
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;

    this.renderHPPersons();
  }

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
    }
    this.renderHPPersons();
    callback && callback(count);
  };

  healHP = (count, callback) => {
    this.hp.current += count;

    if (this.hp.current >= this.hp.total) {
      this.hp.current = this.hp.total;
    }
    this.renderHPPersons();
    callback && callback(count);
  };
}
export default Pokemon;
