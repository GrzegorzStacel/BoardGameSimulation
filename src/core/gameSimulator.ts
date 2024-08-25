import { Piece } from "./types.js";

export function simulateGame(boardY: number, teamAPieces: Piece[], teamBPieces: Piece[]): { teamAPieces: Piece[]; teamBPieces: Piece[] } {
  const positions: Map<string, Piece> = new Map();

  function movePiece(piece: Piece): void {
    piece.y += piece.v;
    const key = `${piece.x},${piece.y}`;
    if (positions.has(key)) {
      const otherPiece = positions.get(key)!;
      if (Math.abs(piece.v) < Math.abs(otherPiece.v)) {
        positions.set(key, piece);
      } else if (Math.abs(piece.v) === Math.abs(otherPiece.v)) {
        positions.delete(key);
      }
    } else if (piece.y >= 0 && piece.y < boardY) {
      positions.set(key, piece);
    }
  }

  while (teamAPieces.length > 0 && teamBPieces.length > 0) {
    teamAPieces.forEach((piece) => movePiece(piece));
    teamBPieces.forEach((piece) => movePiece(piece));

    teamAPieces = Array.from(positions.values()).filter((piece) => piece.v < 0);
    teamBPieces = Array.from(positions.values()).filter((piece) => piece.v > 0);
  }

  return { teamAPieces, teamBPieces };
}
