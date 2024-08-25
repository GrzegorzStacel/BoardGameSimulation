import { Piece } from "./types.js";

export function createPieces(boardX: number, speedA: number, speedB: number, boardY: number): { teamAPieces: Piece[]; teamBPieces: Piece[] } {
  const teamAPieces: Piece[] = [];
  const teamBPieces: Piece[] = [];

  for (let x = 0; x < boardX; x++) {
    const vA = (x % 2 === 0 ? 1 : 2 ** speedA) * -1;
    const vB = x % 2 === 0 ? 1 : 2 ** speedB;
    teamAPieces.push({ x, y: 0, v: vA });
    teamBPieces.push({ x, y: boardY - 1, v: vB });
  }

  return { teamAPieces, teamBPieces };
}
