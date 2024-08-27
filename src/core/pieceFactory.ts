import { Piece } from "./types.js";

export function createPieces(boardX: number, speedA: number, speedB: number, boardY: number): { teamAPieces: Piece[]; teamBPieces: Piece[] } {
  const teamAPieces: Piece[] = [];
  const teamBPieces: Piece[] = [];

  for (let x = 0; x < boardX; x++) {
    // Obliczanie prędkości dla drużyny A
    const vA = (x % 2 === 0 ? 1 * speedA : Math.pow(2, speedA)) * -1;

    // Obliczanie prędkości dla drużyny B
    const vB = x % 2 === 0 ? 1 * speedB : Math.pow(2, speedB);

  }

  return { teamAPieces, teamBPieces };
}
