/*1st exercise*/

//const firstRow = "мама мыла раму";
//const secondRow = "собака друг человека";

const firstRow = prompt('Введите первую фразу с буквами "а"');
const secondRow = prompt('Введите вторую фразу с буквами "а"');

function getRow(firstRow, secondRow) {
  let countCharAInFirstRow = 0;
  let countCharAInSecondRow = 0;

  let result;

  for (let i = 0; i < firstRow.length; i++) {
    if (firstRow.charAt(i) === "а" || firstRow.charAt(i) === "А") {
      countCharAInFirstRow++;
    }
  }

  for (let i = 0; i < secondRow.length; i++) {
    if (secondRow.charAt(i) === "а" || secondRow.charAt(i) === "А") {
      countCharAInSecondRow++;
    }
  }

  if (countCharAInSecondRow > countCharAInFirstRow) {
    result = secondRow;
  } else if (countCharAInSecondRow === countCharAInFirstRow) {
    result = 'количество букв "а" одинаково';
  } else result = firstRow;

  return result;
}

console.log(getRow(firstRow, secondRow)); // мама мыла раму
/*1st exercise*/

/*2nd exercise*/

const phoneNumber = prompt(
  "Введите номер телефона в формате +71234567890",
  "+71234567890"
);
// console.log(phoneNumber);
function formattedPhone(phone) {
  let result = "";

  phone = String(phone);
  for (let i = 0; i < phoneNumber.length; i++) {
    result += phone.charAt(i);
    if (i === 1) {
      result += " (";
    }
    if (i === 4) {
      result += ") ";
    }
    if (i === 7) {
      result += "-";
    }
    if (i === 9) {
      result += "-";
    }
  }
  return result;
}

console.log(formattedPhone(phoneNumber)); // +7 (123) 456-78-90

/*2nd exercise*/
