import { Piece } from "./types.js";

export function simulateGame(boardY: number, teamAPieces: Piece[], teamBPieces: Piece[]): { teamAPieces: Piece[]; teamBPieces: Piece[] } {
  const positions: Map<string, Piece> = new Map();

  // Inicjalizacja pozycji pionków drużyny A i B na planszy
  teamAPieces.forEach((piece) => positions.set(`${piece.x},${piece.y}`, piece));
  teamBPieces.forEach((piece) => positions.set(`${piece.x},${piece.y}`, piece));

  // Symulacja gry dopóki jedna z drużyn nie straci wszystkich pionków
  // Funkcja `isGameOver` sprawdza, czy którakolwiek z drużyn nie ma już żadnych pionków
  // - Funkcja ta jest używana do kontrolowania, czy symulacja gry powinna być kontynuowana
  while (!isGameOver(positions)) {
    const newPositions: Map<string, Piece> = new Map();

    // Przesunięcie wszystkich pionków z drużyny A
    teamAPieces.forEach((piece) => {
      movePiece(piece, boardY, newPositions);
    });

    // Przesunięcie wszystkich pionków z drużyny B
    teamBPieces.forEach((piece) => {
      movePiece(piece, boardY, newPositions);
    });

    // Aktualizacja listy pionków drużyny A i B po przesunięciu
    teamAPieces = Array.from(newPositions.values()).filter((piece) => piece.v < 0);
    teamBPieces = Array.from(newPositions.values()).filter((piece) => piece.v > 0);

    // Wyczyszczenie mapy, oraz aktualizacja pozycji na kolejną turę
    positions.clear();
    newPositions.forEach((piece, key) => positions.set(key, piece));
  }

  // Określenie zwycięzcy lub ogłoszenie remisu
  if (teamAPieces.length === 0 && teamBPieces.length === 0) {
    // Remis
    return { teamAPieces: [], teamBPieces: [] };
  } else if (teamAPieces.length === 0) {
    // Drużyna B wygrywa
    return { teamAPieces: [], teamBPieces: Array.from(positions.values()).filter((piece) => piece.v > 0) };
  } else if (teamBPieces.length === 0) {
    // Drużyna A wygrywa
    return { teamAPieces: Array.from(positions.values()).filter((piece) => piece.v < 0), teamBPieces: [] };
  }
}

function movePiece(piece: Piece, boardY: number, newPositions: Map<string, Piece>): void {
  // Oblicz nową pozycję pionka na osi Y
  const newY = piece.y + piece.v;

  // Stwórz klucz do mapy na podstawie nowych współrzędnych
  const key = `${piece.x},${newY}`;

  // Sprawdź, czy pionek nie wyjdzie poza granicę planszy
  if (newY < 0 || newY >= boardY) {
    // Pionek jest poza granicą, nie dodawaj go do newPositions
    // Później podczas aktualizacji tablicy teamAPieces lub teamBPieces, ten pionek nie będzie uwzględniony,
    // ponieważ nie został dodany do newPositions
    return;
  }

  // Jeśli pionek nie jest poza granicą, sprawdź, czy na tej pozycji nie ma już innego pionka
  if (newPositions.has(key)) {
    const otherPiece = newPositions.get(key)!;

    // Jeśli jest inny pionek, porównaj ich prędkości, aby ustalić, który zostaje
    // Math.abs() zwraca wartość bewzględną, przekazanej liczby
    if (Math.abs(piece.v) > Math.abs(otherPiece.v)) {
      // Pionek 'piece' ma większą prędkość, więc zastępuje inny pionek
      newPositions.set(key, { x: piece.x, y: newY, v: piece.v });
    } else if (Math.abs(piece.v) < Math.abs(otherPiece.v)) {
      // Pionek 'otherPiece' ma większą prędkość, więc zostaje na pozycji
      newPositions.set(key, { x: otherPiece.x, y: otherPiece.y, v: otherPiece.v });
    } else {
      // Prędkości są równe, oba pionki są usuwane (usunięcie klucza z mapy)
      newPositions.delete(key);
    }
  } else {
    // Jeśli na nowej pozycji nie ma innego pionka, dodaj pionek 'piece' do newPositions
    newPositions.set(key, { x: piece.x, y: newY, v: piece.v });
  }
}

// Funkcja sprawdzająca, czy któraś z drużyn nie straciła wszystkich pionków
function isGameOver(positions: Map<string, Piece>): boolean {
  // Sprawdzenie, czy drużyna A, ma jeszcze jakiekolwiek pionki (wartość v < 0)
  // Jeśli drużyna A nie ma już pionków, funkcja some() zwróci wartość false
  const teamAPiecesRemaining = Array.from(positions.values()).some((piece) => piece.v < 0);

  // Sprawdzenie, czy drużyna B, ma jeszcze jakiekolwiek pionki (wartość v > 0)
  // Jeśli drużyna B nie ma już pionków, funkcja some() zwróci wartość false
  const teamBPiecesRemaining = Array.from(positions.values()).some((piece) => piece.v > 0);

  // Zwrócenie true, jeśli którakolwiek z drużyn nie ma już pionków
  return !teamAPiecesRemaining || !teamBPiecesRemaining;
}
