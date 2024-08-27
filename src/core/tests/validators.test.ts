import { validateInput } from "../validators";
import { InputData } from "../types";

describe("validateInput", () => {
  it('should return "error" for invalid team names', () => {
    const invalidTeamNames: InputData[] = [
      ["SweetVictory123", 1, "TeamB", 2, 3, 7], // Nazwa drużyny zawiera cyfry
      ["TeamB", 1, "SweetVictory123", 2, 3, 7], // Nazwa drużyny zawiera cyfry
      ["SweetVictory123", 1, "SweetVictory123", 2, 3, 7], // Obie nazwy drużyn zawierają cyfry
      ["TeamA", 1, "Team*", 2, 3, 7], // Nazwa drużyny zawiera znak specjalny
      ["Team*", 1, "TeamA", 2, 3, 7], // Nazwa drużyny zawiera znak specjalny
      ["Team*", 1, "Team*", 2, 3, 7], // Obie nazwy drużyn zawierają znak specjalny
      ["DrużynaĄ", 1, "TeamB", 2, 3, 7], // Nazwa drużyny zawiera znak spoza ASCII
      ["TeamB", 1, "DrużynaĄ", 2, 3, 7], // Nazwa drużyny zawiera znak spoza ASCII
      ["DrużynaĄ", 1, "DrużynaĄ", 2, 3, 7], // Obie nazwy drużyn zawierają znak spoza ASCII
      ["TeamA", 1, "TeamA", 2, 3, 7], // Takie same nazwy drużyn (poprawne, ale te same)
      ["TeamA", 1, "", 2, 3, 7], // Jedna z nazw drużyn jest pusta
      ["", 1, "TeamA", 2, 3, 7], // Jedna z nazw drużyn jest pusta
      ["", 1, "", 2, 3, 7], // Obie nazwy drużyn są puste
      ["ThisTeamNameIsWayTooLong", 1, "TeamB", 2, 3, 7], // Nazwa drużyny za długa
      ["TeamA", 1, "ThisTeamNameIsWayTooLong", 2, 3, 7], // Druga nazwa drużyny za długa
      ["ThisTeamNameIsWayTooLong", 1, "ThisTeamNameIsWayTooLong", 2, 3, 7], // Obie nazwy drużyn za długie
    ];

    invalidTeamNames.forEach((input) => {
      expect(validateInput(input)).toBe("error");
    });
  });

  it('should return "error" for invalid speeds', () => {
    const invalidSpeeds: InputData[] = [
      ["TeamA", 0, "TeamB", 2, 3, 7], // Prędkość A za niska
      ["TeamA", 4, "TeamB", 2, 3, 7], // Prędkość A za wysoka
      ["TeamA", 1, "TeamB", 0, 3, 7], // Prędkość B za niska
      ["TeamA", 1, "TeamB", 4, 3, 7], // Prędkość B za wysoka
      ["TeamA", 0, "TeamB", 0, 3, 7], // Prędkości A i B za niskie
      ["TeamA", 4, "TeamB", 4, 3, 7], // Prędkości A i B za wysokie
    ];

    invalidSpeeds.forEach((input) => {
      expect(validateInput(input)).toBe("error");
    });
  });

  it('should return "error" for invalid board dimensions', () => {
    const invalidBoardDimensions: InputData[] = [
      ["TeamA", 1, "TeamB", 2, 0, 7], // Wymiary planszy X za niskie
      ["TeamA", 1, "TeamB", 2, 1001, 7], // Wymiary planszy X za wysokie
      ["TeamA", 1, "TeamB", 2, 3, 0], // Wymiary planszy Y za niskie
      ["TeamA", 1, "TeamB", 2, 3, 1001], // Wymiary planszy Y za wysokie
      ["TeamA", 1, "TeamB", 2, 0, 0], // Wymiary planszy X i Y za niskie
      ["TeamA", 1, "TeamB", 2, 1001, 1001], // Wymiary planszy X i Y za wysokie
    ];

    invalidBoardDimensions.forEach((input) => {
      expect(validateInput(input)).toBe("error");
    });
  });

  it('should return "error" for incorrect number of input lines', () => {
    const incorrectInputs: Array<unknown[]> = [
      ["TeamA", 1, "TeamB", 2, 3], // Brakuje jednej linii (5)
      ["TeamA", 1, "TeamB", 2, 3, 7, 8], // Dodatkowa linia (7)
      [], // Brak danych (0)
    ];

    incorrectInputs.forEach((inputArray) => {
      const input = inputArray.length === 6 ? (inputArray as InputData) : (["", 0, "", 0, 0, 0] as InputData); // Użyj wartości domyślnych jeśli nie pasuje do InputData

      expect(validateInput(input)).toBe("error");
    });
  });

  it('should return "error" for invalid number formats', () => {
    const invalidNumberInputs: InputData[] = [
      ["TeamA", NaN, "TeamB", 2, 3, 7], // speedA jest NaN
      ["TeamA", 1, "TeamB", NaN, 3, 7], // speedB jest NaN
      ["TeamA", 1, "TeamB", 2, NaN, 7], // boardX jest NaN
      ["TeamA", 1, "TeamB", 2, 3, NaN], // boardY jest NaN
      ["TeamA", NaN, "TeamB", NaN, NaN, NaN], // Wszystko jest NaN
      ["TeamA", "1" as any, "TeamB", 2, 3, 7], // speedA jest ciągiem znaków zamiast liczby
      ["TeamA", 1, "TeamB", "2" as any, 3, 7], // speedB jest ciągiem znaków zamiast liczby
      ["TeamA", "1" as any, "TeamB", "2" as any, 3, 7], // speedA i speedB są ciągami znaków zamiast liczb
      ["TeamA", 1, "TeamB", 2, 10.1, 1.4], // boardX i boardY są liczbami zmiennoprzecinkowymi (powinny być całkowite)
      ["TeamA", 1.3, "TeamB", 2.1, 10, 1], // speedA i speedB są liczbami zmiennoprzecinkowymi (powinny być całkowite)
      ["TeamA", 1.3, "TeamB", 2.56, 10.5, 1.4], // speedA, speedB, boardX i boardY są liczbami zmiennoprzecinkowymi (wszystkie powinny być całkowite)
    ];

    invalidNumberInputs.forEach((input) => {
      expect(validateInput(input)).toBe("error");
    });
  });

  it("should return null for valid input data", () => {
    const validInputs: InputData[] = [
      ["TeamA", 1, "TeamB", 2, 3, 7], // Poprawne dane wejściowe
      ["Team1", 2, "Team2", 3, 500, 500], // Poprawne dane z większymi wymiarami planszy
      ["Alpha", 3, "Beta", 1, 1000, 1000], // Poprawne dane z maksymalną prędkością i wymiarami planszy
      ["X", 1, "Y", 1, 1, 1], // Poprawne dane z minimalną prędkością i wymiarami planszy
      ["X", 3, "Y", 3, 1000, 1000], // Poprawne dane z maksymalną prędkością i wymiarami planszy
    ];

    validInputs.forEach((input) => {
      expect(validateInput(input)).toBeNull();
    });
  });
});
