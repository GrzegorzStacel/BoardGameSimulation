import { InputData } from "./types.js";

export function isValidTeamName(name: string): boolean {
  return /^[A-Za-z0-9]{1,10}$/.test(name);
}

export function validateInput(input: InputData): string | null {
  if (input.length !== 6) return "error"; // Check for the correct number of elements

  const [teamA, speedA, teamB, speedB, boardX, boardY] = input;

  if (!isValidTeamName(teamA) || !isValidTeamName(teamB) || teamA === teamB) return "error";
  if (isNaN(speedA) || isNaN(speedB) || isNaN(boardX) || isNaN(boardY)) return "error";
  if (speedA < 1 || speedA > 3 || speedB < 1 || speedB > 3) return "error";
  if (boardX < 1 || boardX > 1000 || boardY < 1 || boardY > 1000) return "error";

  return null;
}
