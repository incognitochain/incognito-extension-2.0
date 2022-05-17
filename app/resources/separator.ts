// import LocalDatabase from '@utils/LocalDatabase';

let decimalSeparator = ".";
let groupSeparator = ",";

// async function loadSeparator() {
//   const savedDecimalSeparator = await LocalDatabase.getDecimalSeparator();

//   if (!savedDecimalSeparator) {
//     setDecimalSeparator('.');
//     LocalDatabase.saveDecimalSeparator('.');
//   } else {
//     decimalSeparator = savedDecimalSeparator;

//     if (savedDecimalSeparator === '.') {
//       groupSeparator = ',';
//     } else {
//       groupSeparator = '.';
//     }
//   }
// }

// export function setDecimalSeparator(newSeparator) {
//   if (decimalSeparator !== newSeparator) {
//     groupSeparator = decimalSeparator;
//     decimalSeparator = newSeparator;
//     LocalDatabase.saveDecimalSeparator(decimalSeparator);
//   }
// }

export function getDecimalSeparator() {
  return decimalSeparator;
}

export function getGroupSeparator() {
  return groupSeparator;
}

// loadSeparator();
