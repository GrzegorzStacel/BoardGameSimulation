# BoardGameSimulation

## Instalacja

1. **Sklonuj repozytorium:**

```bash
git clone https://github.com/GrzegorzStacel/BoardGameSimulation
cd <nazwa-folderu>
```

2. **Instalacja zależności:**

```bash
npm install
```

3. **Uruchamianie aplikacji:**

```bash
npm start
```

# Dokumentacja

## Mierzenie czasu wykonania aplikacji

**W pliku `main.ts` dodano możliwość mierzenia czasu wykonania aplikacji. Aby skorzystać z tej opcji, należy odkomentować linię `console.log` znajdującą się w ostatniej linii funkcji `main()`.**

## Dane wejściowe

**Tokyo**

**1**

**Berlin**

**2**

**3**

**7**

### Wynik

**Berlin**

### Czas Wykonania

**3.55 ms**

## Uruchamianie testów:

```bash
npm test
```

# Testy jednostkowe

## `readInputFile`

### Testy

- **should return parsed input data for a valid input file**
- **should return null if the file does not exist**
- **should return null if the input file has incorrect number of lines**
- **should return null if the file content is empty**
- **should handle non-numeric values in the file and return NaN in place of those values**
- **should handle extra whitespace in the file**
- **should return null if the file contains non-ASCII characters**
- **should return null if the file contains only whitespace characters**
- **should return null if the file contains more than 6 lines**
- **should return null if the file contains non-ASCII characters and incorrect number of lines**
- **should return null if the file contains non-ASCII characters with extra whitespace**
- **should correctly parse a valid file content with extra whitespace and no non-ASCII characters**
- **should return null if the file contains only newlines**

## `simulateGame`

### Testy

- **should return the correct result when Team A wins**
- **should return the correct result when Team Berlin wins**
- **should return a draw when both teams have no pieces left**
- **should remove pieces that move out of bounds**
- **should remove pieces that move out of bounds during simulation**
- **should correctly handle an empty board**

## `createPieces`

### Testy

- **should create pieces with minimal values**
- **should handle larger board dimensions**
- **should handle different speeds**
- **should handle a board with dimensions 15x15 correctly**

## `validateInput`

### Testy

- **should return "error" for invalid team names**
- **should return "error" for invalid speeds**
- **should return "error" for invalid board dimensions**
- **should return "error" for incorrect number of input lines**
- **should return "error" for invalid number formats**
- **should return null for valid input data**
