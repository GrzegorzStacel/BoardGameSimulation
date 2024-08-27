import { simulateGame } from "../gameSimulator";
import { Piece } from "../types";

describe("simulateGame", () => {
  it("should return the correct result when Team A wins", () => {
    const boardY = 5;
    const teamAPieces: Piece[] = [
      { x: 0, y: 4, v: -2 },
      { x: 1, y: 4, v: -2 },
    ];
    const teamBPieces: Piece[] = [
      { x: 0, y: 1, v: 1 },
      { x: 1, y: 1, v: 1 },
    ];
    const result = simulateGame(boardY, teamAPieces, teamBPieces);
    expect(result.teamAPieces.length).toBe(2);
    expect(result.teamBPieces.length).toBe(0);
  });

  it("should return the correct result when Team Berlin wins", () => {
    const boardY = 5;
    const teamAPieces: Piece[] = [
      { x: 0, y: 1, v: -1 },
      { x: 1, y: 1, v: -1 },
    ];
    const teamBPieces: Piece[] = [
      { x: 0, y: 2, v: 1 },
      { x: 1, y: 2, v: 1 },
    ];
    const result = simulateGame(boardY, teamAPieces, teamBPieces);
    expect(result.teamAPieces.length).toBe(0);
    expect(result.teamBPieces.length).toBe(2);
  });

  it("should return a draw when both teams have no pieces left", () => {
    const boardY = 5;
    const teamAPieces: Piece[] = [
      { x: 0, y: 1, v: -1 },
      { x: 1, y: 2, v: -2 },
    ];
    const teamBPieces: Piece[] = [
      { x: 0, y: 3, v: 1 },
      { x: 1, y: 2, v: 2 },
    ];
    const result = simulateGame(boardY, teamAPieces, teamBPieces);
    expect(result.teamAPieces.length).toBe(0);
    expect(result.teamBPieces.length).toBe(0);
  });

  it("should remove pieces that move out of bounds", () => {
    const boardY = 3;
    const teamAPieces: Piece[] = [{ x: 0, y: 1, v: -2 }];
    const teamBPieces: Piece[] = [{ x: 1, y: 0, v: 1 }];
    const result = simulateGame(boardY, teamAPieces, teamBPieces);
    expect(result.teamAPieces.length).toBe(0);
    expect(result.teamBPieces.length).toBe(1);
  });

  it("should remove pieces that move out of bounds during simulation", () => {
    const boardY = 5;
    const teamAPieces: Piece[] = [
      { x: 0, y: 1, v: -1 },
      { x: 2, y: 0, v: -2 },
    ];
    const teamBPieces: Piece[] = [
      { x: 1, y: 1, v: 1 },
      { x: 3, y: 2, v: 2 },
    ];
    const result = simulateGame(boardY, teamAPieces, teamBPieces);

    expect(result.teamAPieces.length).toBe(0);
    expect(result.teamBPieces.length).toBe(1);
  });

  it("should correctly handle an empty board", () => {
    const boardY = 5;
    const teamAPieces: Piece[] = [];
    const teamBPieces: Piece[] = [];
    const result = simulateGame(boardY, teamAPieces, teamBPieces);
    expect(result.teamAPieces.length).toBe(0);
    expect(result.teamBPieces.length).toBe(0);
  });
});
