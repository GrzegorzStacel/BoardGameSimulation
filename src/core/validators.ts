import { InputData } from "./types.js";

// Funkcja walidująca dane wejściowe
// Sprawdza poprawność liczby elementów oraz wartość każdego z nich
export function validateInput(input: InputData): string | null {
  // Sprawdź, czy liczba elementów jest równa 6
  if (input.length !== 6) return "error";

  const [teamA, speedA, teamB, speedB, boardX, boardY] = input;

  // Upewnij się, że wartości są liczbami, a nie tylko konwertowalne na liczby
  if (typeof speedA !== "number" || typeof speedB !== "number" || typeof boardX !== "number" || typeof boardY !== "number") {
    return "error";
  }

  // Sprawdź, czy wartości są liczbami całkowitymi
  if (!Number.isInteger(speedA) || !Number.isInteger(speedB) || !Number.isInteger(boardX) || !Number.isInteger(boardY)) {
    return "error";
  }

  // Sprawdź poprawność nazw drużyn oraz czy są one różne
  if (!isValidTeamName(teamA) || !isValidTeamName(teamB) || teamA === teamB) return "error";

  // Sprawdź, czy prędkości oraz wymiary planszy są liczbami
  if (isNaN(speedA) || isNaN(speedB) || isNaN(boardX) || isNaN(boardY)) return "error";

  // Sprawdź, czy prędkości są w dozwolonym zakresie (1-3)
  if (speedA < 1 || speedA > 3 || speedB < 1 || speedB > 3) return "error";

  // Sprawdź, czy wymiary planszy są w dozwolonym zakresie (1-1000)
  if (boardX < 1 || boardX > 1000 || boardY < 1 || boardY > 1000) return "error";

  return null;
}

// Funkcja sprawdzająca poprawność nazwy drużyny
// Nazwa drużyny jest uznawana za poprawną, jeśli składa się z 1-10 znaków alfanumerycznych
export function isValidTeamName(name: string): boolean {
  return /^[A-Za-z0-9]{1,10}$/.test(name);
}
