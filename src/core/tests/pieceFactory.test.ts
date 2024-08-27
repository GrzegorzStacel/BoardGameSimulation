import { createPieces } from "../pieceFactory";

describe("createPieces", () => {
  it("should create pieces with minimal values", () => {
    const boardX = 1;
    const boardY = 1;
    const speedA = 1;
    const speedB = 1;

    const result = createPieces(boardX, speedA, speedB, boardY);

    expect(result.teamAPieces).toEqual([{ x: 0, y: 0, v: -1 }]);
    expect(result.teamBPieces).toEqual([{ x: 0, y: 0, v: 1 }]);
  });

  it("should handle larger board dimensions", () => {
    const boardX = 3;
    const boardY = 3;
    const speedA = 1;
    const speedB = 2;

    const result = createPieces(boardX, speedA, speedB, boardY);

    expect(result.teamAPieces).toEqual([
      { x: 0, y: 2, v: -1 },
      { x: 1, y: 2, v: -2 },
      { x: 2, y: 2, v: -1 },
    ]);

    expect(result.teamBPieces).toEqual([
      { x: 0, y: 0, v: 2 },
      { x: 1, y: 0, v: 4 },
      { x: 2, y: 0, v: 2 },
    ]);
  });

  it("should handle different speeds", () => {
    const boardX = 2;
    const boardY = 4;
    const speedA = 2;
    const speedB = 1;

    const result = createPieces(boardX, speedA, speedB, boardY);

    expect(result.teamAPieces).toEqual([
      { x: 0, y: 3, v: -2 },
      { x: 1, y: 3, v: -4 },
    ]);

    expect(result.teamBPieces).toEqual([
      { x: 0, y: 0, v: 1 },
      { x: 1, y: 0, v: 2 },
    ]);
  });

  it("should handle a board with dimensions 15x15 correctly", () => {
    const boardX = 15;
    const boardY = 15;
    const speedA = 2;
    const speedB = 1;

    const result = createPieces(boardX, speedA, speedB, boardY);

    // Oczekiwane wartości dla teamAPieces
    expect(result.teamAPieces).toEqual([
      { x: 0, y: 14, v: -2 },
      { x: 1, y: 14, v: -4 },
      { x: 2, y: 14, v: -2 },
      { x: 3, y: 14, v: -4 },
      { x: 4, y: 14, v: -2 },
      { x: 5, y: 14, v: -4 },
      { x: 6, y: 14, v: -2 },
      { x: 7, y: 14, v: -4 },
      { x: 8, y: 14, v: -2 },
      { x: 9, y: 14, v: -4 },
      { x: 10, y: 14, v: -2 },
      { x: 11, y: 14, v: -4 },
      { x: 12, y: 14, v: -2 },
      { x: 13, y: 14, v: -4 },
      { x: 14, y: 14, v: -2 },
    ]);

    // Oczekiwane wartości dla teamBPieces
    expect(result.teamBPieces).toEqual([
      { x: 0, y: 0, v: 1 },
      { x: 1, y: 0, v: 2 },
      { x: 2, y: 0, v: 1 },
      { x: 3, y: 0, v: 2 },
      { x: 4, y: 0, v: 1 },
      { x: 5, y: 0, v: 2 },
      { x: 6, y: 0, v: 1 },
      { x: 7, y: 0, v: 2 },
      { x: 8, y: 0, v: 1 },
      { x: 9, y: 0, v: 2 },
      { x: 10, y: 0, v: 1 },
      { x: 11, y: 0, v: 2 },
      { x: 12, y: 0, v: 1 },
      { x: 13, y: 0, v: 2 },
      { x: 14, y: 0, v: 1 },
    ]);
  });
});
