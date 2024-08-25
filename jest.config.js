export default {
  preset: "ts-jest", // Używamy ts-jest do obsługi TypeScript
  testEnvironment: "node", // Środowisko testowe Node.js
  moduleFileExtensions: ["ts", "js"], // Rozszerzenia plików, które mogą być importowane
  testMatch: ["**/?(*.)+(spec|test).ts"], // Wzorce dopasowujące pliki testowe
};
