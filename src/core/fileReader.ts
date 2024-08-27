import fs from "fs";
import { InputData } from "./types.js";

// Funkcja odczytująca dane z pliku i zwracająca obiekt InputData lub null w przypadku błędu
export function readInputFile(filename: string): Promise<InputData | null> {
  return new Promise((resolve) => {
    // Odczytanie pliku w formacie UTF-8
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        // W przypadku błędu odczytu pliku, logujemy "error" i zwracamy null
        console.log("error");
        resolve(null);
        return;
      }

      // Konwertowanie Buffer na string
      const fileContent = data.toString();

      // Sprawdzamy obecność znaków nie-ASCII w zawartości pliku
      if (/[^ -~\n]/.test(fileContent)) {
        // Jeśli występują znaki nie-ASCII, logujemy "error" i zwracamy null
        console.log("error");
        resolve(null);
        return;
      }

      // Rozdzielanie zawartości pliku na linie, usuwanie białych znaków z początku i końca każdej linii
      const input = fileContent
        .trim()
        .split("\n")
        .map((line) => line.trim());

      // Sprawdzamy, czy liczba linii jest równa 6
      if (input.length !== 6) {
        // Jeśli liczba linii jest nieprawidłowa, logujemy "error" i zwracamy null
        console.log("error");
        resolve(null);
        return;
      }

      // Parsowanie wartości z linii wejściowych na odpowiednie typy
      const parsedInput: InputData = [input[0], parseInt(input[1], 10), input[2], parseInt(input[3], 10), parseInt(input[4], 10), parseInt(input[5], 10)];

      resolve(parsedInput);
    });
  });
}
