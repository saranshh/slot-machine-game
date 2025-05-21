const SYMBOLS = ["C", "L", "O", "W"];
const SYMBOL_REWARDS: Record<string, number> = {
  C: 10,
  L: 20,
  O: 30,
  W: 40,
};

const getRandomSymbol = (): string => {
  const randomIndex = Math.floor(Math.random() * SYMBOLS.length);
  return SYMBOLS[randomIndex];
};

const generateRandomSpin = (): string[] => {
  return [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
};

const isWin = (symbols: string[]): boolean => {
  return symbols[0] === symbols[1] && symbols[1] === symbols[2];
};

const calculateWinAmount = (symbol: string): number => {
  return SYMBOL_REWARDS[symbol] || 0;
};

const shouldCheat = (credits: number): boolean => {
  if (credits >= 60) {
    return Math.random() < 0.6;
  } else if (credits >= 40) {
    return Math.random() < 0.3;
  }
  return false;
};

export const spin = (credits: number) => {
  let symbols = generateRandomSpin();
  let win = isWin(symbols);

  if (win && credits >= 40 && shouldCheat(credits)) {
    do {
      symbols = generateRandomSpin();
      win = isWin(symbols);
    } while (win);
  }

  const winAmount = win ? calculateWinAmount(symbols[0]) : 0;

  return {
    symbols,
    win,
    winAmount,
  };
};
