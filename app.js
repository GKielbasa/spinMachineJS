// 1. Deposit some money
// 2. Determine a number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again

// funkcja rquire - to funkcja  Node.js służąca do wczytywania(importownaia) modułów  z plików w formacie JavaScript

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

//przelicznik wartości
const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    //console.log(typeof depositAmount); // typeof sprawdza typ
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, try again.");
    } else {
      //   console.log(numberDepositAmount);
      //   console.log(depositAmount);
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const getNumberOfLines = prompt(
      "On how many lines do you want to bet (from 1 to 3) : "
    );
    const numberOfLines = parseInt(getNumberOfLines);
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Wrong value! Type again ");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, numberOfLines) => {
  while (true) {
    console.log("your balance is: " + balance);
    const betString = prompt("How much do you want to bet per line : ");
    const bet = parseFloat(betString);
    if (isNaN(bet) || bet * numberOfLines > balance || bet <= 0) {
      console.log("you typed wrong value, type again. ");
    } else {
      return bet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols]; // splash operator
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1); // usunie wybrany element aby niemozna było go wybrac ponownie
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break; //boom done iterate ~!
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have a balacne of $" + balance)
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if (balance <=0) {
      console.log("you run out of money!");
      break;
    }

    const playAgain = prompt(" Do you want to play again ? (y/n)")
    if (playAgain != "y") break;
  }
};

game();

// const testTab = [1,2,3,4,5];
// const copyOfTab = testTab;

// console.log(testTab);
// console.log(copyOfTab);

// for (let i=0; i<testTab.length; i++){
//   testTab[i] = testTab[i] +1;
// }
// console.log(testTab);
// console.log(copyOfTab);
// console.log("kolejny test ")
// copyOfTab[2] += 10;
// console.log(copyOfTab);
// console.log(testTab);
