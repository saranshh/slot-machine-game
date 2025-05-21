import { spin } from "../services/gameService";

describe("Game Service", () => {
  // Helper to create a winning combination with a specific symbol
  const createWinningSymbols = (symbol: string): string[] => [
    symbol,
    symbol,
    symbol,
  ];
  const mockRandom = (value: number) => {
    const originalRandom = Math.random;
    Math.random = jest.fn().mockReturnValue(value);
    return () => {
      Math.random = originalRandom;
    };
  };

  test("should calculate correct win amount for cherry", () => {
    const resetRandom = mockRandom(0);

    // Force a winning combination with cherries
    const result = spin(10); // Credits < 40, so no cheating

    expect(result.symbols).toEqual(["C", "C", "C"]);
    expect(result.win).toBe(true);
    expect(result.winAmount).toBe(10); // Cherry reward is 10

    resetRandom();
  });

  test("should not cheat when credits < 40", () => {
    // Set up a scenario where we always get a winning spin
    const resetRandom = mockRandom(0); 
    const result = spin(30); // Credits < 40

    // Should be a win since we're not cheating
    expect(result.win).toBe(true); 

    resetRandom();
  });

  test("should sometimes cheat when 40 <= credits < 60", () => {
    // First, mock that we get a winning spin
    let resetRandom = mockRandom(0);  
    resetRandom();
    resetRandom = mockRandom(0.1); // 0.1 < 0.3, so should cheat

    const originalRandom = Math.random;
    let callCount = 0;
    Math.random = jest.fn().mockImplementation(() => {
      callCount++;
      return callCount === 1 ? 0.1 : (callCount % 4) * 0.25;
    });

    const result = spin(50); // 40 <= credits < 60

    // Should be a losing spin because we cheated
    expect(result.win).toBe(false);

    Math.random = originalRandom;
  });

  test("should cheat more often when credits >= 60", () => {
    // Mock that we get a winning spin
    let resetRandom = mockRandom(0);  
    resetRandom();
    resetRandom = mockRandom(0.4); // 0.4 < 0.6, so should cheat

    const originalRandom = Math.random;
    let callCount = 0;
    Math.random = jest.fn().mockImplementation(() => {
      callCount++;
      return callCount === 1 ? 0.4 : (callCount % 4) * 0.25;
    });
    const result = spin(70); // credits >= 60

    // Should be a losing spin because we cheated
    expect(result.win).toBe(false);

    Math.random = originalRandom;
  });
});
