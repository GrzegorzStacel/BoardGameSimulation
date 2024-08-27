import { validateInput } from "./core/validators.js";
import { createPieces } from "./core/pieceFactory.js";
import { simulateGame } from "./core/gameSimulator.js";
import { readInputFile } from "./core/fileReader.js";

// Funkcja główna do uruchomienia programu
async function main() {
  const start = performance.now(); // Start mierzenia czasu wykonania

  // Wczytaj dane wejściowe z pliku
  const input = await readInputFile("daneWejsciowe.txt");
  if (!input) {
    console.log("error"); // Jeśli dane wejściowe są puste, wyświetl błąd
    return;
  }

  // Sprawdź poprawność danych wejściowych
  const validationError = validateInput(input);
  if (validationError) {
    console.log("error");
    return;
  }

  const [teamA, speedA, teamB, speedB, boardX, boardY] = input;

  // Stwórz obiekty dla drużyn na planszy na podstawie danych wejściowych
  const { teamAPieces, teamBPieces } = createPieces(boardX, speedA, speedB, boardY);

  // Symuluj grę i uzyskaj pozostałe elementy dla obu drużyn
  const { teamAPieces: remainingA, teamBPieces: remainingB } = simulateGame(boardY, teamAPieces, teamBPieces);

  // Sprawdź, która drużyna pozostała
  if (remainingA.length > 0) {
    console.log(teamA); // Wyświetl nazwę drużyny A, jeśli pozostały jej elementy
  } else if (remainingB.length > 0) {
    console.log(teamB); // Wyświetl nazwę drużyny B, jeśli pozostały jej elementy
  } else {
    console.log("remis"); // Jeśli żadna drużyna nie ma już elementów, ogłoś remis
  }

  const end = performance.now(); // Koniec mierzenia czasu wykonania
  // console.log(`Czas wykonania: ${(end - start).toFixed(2)} ms`);
}

main();
