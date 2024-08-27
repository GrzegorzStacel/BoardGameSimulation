import fs from "fs";
import { readInputFile } from "../fileReader";
import { InputData } from "../types";

// Mockowanie modułu fs
jest.mock("fs");

describe("readInputFile", () => {
  const mockFsReadFile = fs.readFile as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return parsed input data for a valid input file", async () => {
    const fileContent = "TeamA\n1\nTeamB\n2\n3\n7\n";
    const expectedOutput: InputData = ["TeamA", 1, "TeamB", 2, 3, 7];

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("dummyFile.txt");
    expect(result).toEqual(expectedOutput);
  });

  it("should return null if the file does not exist", async () => {
    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, _encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(new Error("File not found"), Buffer.alloc(0));
    });

    const result = await readInputFile("nonExistentFile.txt");
    expect(result).toBeNull();
  });

  it("should return null if the input file has incorrect number of lines", async () => {
    const fileContent = "TeamA\n1\nTeamB\n2\n3\n"; // Tylko 5 linii zamiast 6

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("invalidFile.txt");
    expect(result).toBeNull();
  });

  it("should return null if the file content is empty", async () => {
    const fileContent = ""; // Pusty plik

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("emptyFile.txt");
    expect(result).toBeNull();
  });

  it("should handle non-numeric values in the file and return NaN in place of those values", async () => {
    const fileContent = "TeamA\none\nTeamB\ntwo\nthree\nseven\n";
    const expectedOutput: InputData = ["TeamA", NaN, "TeamB", NaN, NaN, NaN];

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("fileWithStrings.txt");
    expect(result).toEqual(expectedOutput);
  });

  it("should handle extra whitespace in the file", async () => {
    const fileContent = "  TeamA  \n  1 \n   TeamB \n 2 \n  3\n 7  \n";
    const expectedOutput: InputData = ["TeamA", 1, "TeamB", 2, 3, 7];

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("whitespaceFile.txt");
    expect(result).toEqual(expectedOutput);
  });

  it("should return null if the file contains non-ASCII characters", async () => {
    const fileContent = "DrużynaĄ\n1\nTeamB\n2\n3\n7\n"; // Zawiera znaki spoza ASCII

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("nonAsciiFile.txt");
    expect(result).toBeNull();
  });

  it("should return null if the file contains only whitespace characters", async () => {
    const fileContent = "  \n  \n \n \n \n \n"; // Tylko znaki białe

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("whitespaceOnlyFile.txt");
    expect(result).toBeNull();
  });

  it("should return null if the file contains more than 6 lines", async () => {
    const fileContent = "TeamA\n1\nTeamB\n2\n3\n7\nExtraLine\n"; // Więcej niż 6 linii

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("extraLineFile.txt");
    expect(result).toBeNull();
  });

  it("should return null if the file contains non-ASCII characters and incorrect number of lines", async () => {
    const fileContent = "Drużyna\n1\nTeamB\n2\n"; // 4 linie, zawiera znaki spoza ASCII

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("nonAsciiAndInvalidLinesFile.txt");
    expect(result).toBeNull();
  });

  it("should return null if the file contains non-ASCII characters with extra whitespace", async () => {
    const fileContent = "  DrużynaĄ  \n  1 \n  TeamB  \n  2 \n  3\n  7  \n"; // Zawiera znaki spoza ASCII i dodatkowe białe znaki

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("nonAsciiAndWhitespaceFile.txt");
    expect(result).toBeNull();
  });

  it("should correctly parse a valid file content with extra whitespace and no non-ASCII characters", async () => {
    const fileContent = "  TeamA  \n  1 \n   TeamB \n 2 \n  3\n 7  \n";
    const expectedOutput: InputData = ["TeamA", 1, "TeamB", 2, 3, 7];

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("validFileWithWhitespace.txt");
    expect(result).toEqual(expectedOutput);
  });

  it("should return null if the file contains only newlines", async () => {
    const fileContent = "\n\n\n\n\n\n"; // Tylko znaki nowej linii

    mockFsReadFile.mockImplementation((_path: fs.PathOrFileDescriptor, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, Buffer.from(fileContent, encoding));
    });

    const result = await readInputFile("newlineOnlyFile.txt");
    expect(result).toBeNull();
  });
});
