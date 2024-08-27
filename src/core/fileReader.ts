import fs from "fs";
import { InputData } from "./types.js";

export function readInputFile(filename: string): Promise<InputData | null> {
  return new Promise((resolve) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
      // Konwertowanie Buffer na string
      const fileContent = data.toString();

      // Sprawdzamy obecność znaków nie-ASCII w zawartości pliku
      if (/[^ -~\n]/.test(fileContent)) {
        // Jeśli występują znaki nie-ASCII, logujemy "error" i zwracamy null
        console.log("error");
        resolve(null);
        return;
      }

      const input = data
        .trim()
        .split("\n")
        .map((line) => line.trim());

      if (input.length !== 6) {
        console.log("error");
        resolve(null);
        return;
      }

      const parsedInput: InputData = [input[0], parseInt(input[1], 10), input[2], parseInt(input[3], 10), parseInt(input[4], 10), parseInt(input[5], 10)];

      resolve(parsedInput);
    });
  });
}
