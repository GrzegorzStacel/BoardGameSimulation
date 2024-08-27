import { validateInput } from "./core/validators.js";
import { createPieces } from "./core/pieceFactory.js";
import { simulateGame } from "./core/gameSimulator.js";
import { readInputFile } from "./core/fileReader.js";

async function main() {
  const start = performance.now(); // Start mierzenia czasu

  const input = await readInputFile("daneWejsciowe.txt");
  if (!input) {
    console.log("error"); // Jeśli dane wejściowe są puste, wyświetl błąd
    return;
  }

  const validationError = validateInput(input);
  if (validationError) {
    console.log("error");
    return;
  }

  const [teamA, speedA, teamB, speedB, boardX, boardY] = input;
  const { teamAPieces, teamBPieces } = createPieces(boardX, speedA, speedB, boardY);

  const { teamAPieces: remainingA, teamBPieces: remainingB } = simulateGame(boardY, teamAPieces, teamBPieces);

  if (remainingA.length > 0) {
    console.log(teamA);
  } else if (remainingB.length > 0) {
    console.log(teamB);
  } else {
    console.log("remis");
  }

  const end = performance.now(); // Koniec mierzenia czasu
  // console.log(`Czas wykonania: ${(end - start).toFixed(2)} ms`);
}

main();
