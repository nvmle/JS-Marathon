export function random(max, min = 0) {
  const num = max - min;
  return Math.ceil(Math.random() * num + min);
}

const $logs = document.querySelector("#logs");

export function generateLog(firstPerson, secondPerson, damage) {
  const logs = [
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага -${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага -${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил -${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар -${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком <вырезанно цензурой> противника -${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар -${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар -${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника -${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника -${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику -${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
  ];

  displayLogs(logs[random(logs.length) - 1]);
}

// export function generateHealLog(firstPerson, healValue) {
//   const logs = [
//     `Пролился свет с небес на землю и ${firstPerson.name} восстановил часть здоровья +${healValue}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
//     `${firstPerson.name} съел яблоко и пополнил энергию +${healValue}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
//     `${firstPerson.name} испил целебный элексир, что прибавило ему сил +${healValue}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
//   ];

//   displayLogs(logs[random(logs.length) - 1]);
// }

export function displayLogs(log) {
  const $p = document.createElement("p");
  $p.innerText = log;
  $logs.insertBefore($p, $logs.children[0]);
}

export function clickCounter(maxClicks = 8, button) {
  let clickCount = 0;
  const innerText = button.innerText;
  button.innerText = `${innerText}(${maxClicks - clickCount})`;
  return function (n = 0) {
    clickCount += n;
    button.innerText = `${innerText}(${maxClicks - clickCount})`;
    if (clickCount >= maxClicks) {
      button.disabled = true;
    }
    return clickCount;
  };
}

export function randomPokemon() {
  const pokemons = [
    "Pikachu",
    "Charmander",
    "Bulbasaur",
    "Squirtle",
    "Pidgey",
    "Mew",
  ];

  return pokemons[random(pokemons.length - 1)];
}
