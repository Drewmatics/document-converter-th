import { InputData } from "src/types/InputData";
import * as StringParser from "../../../../src/services/parsers/stringParser";
import { BadRequestException } from "@nestjs/common";

describe("stringParser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Given I have a line and element separators", () => {
    let lineSeparator: string;
    let elementSeparator: string;
    beforeAll(() => {
      lineSeparator = "~";
      elementSeparator = "*";
    });

    test("A BadRequestException is thrown when the string does not contain the line separator", () => {
      const data: string = `ProductID*4*23`;
      expect(() =>
        StringParser.parseString(data, {
          elementSeparator,
          lineSeparator,
          output: "json",
        }),
      ).toThrow(BadRequestException);
    });

    test("A valid XML String is created using the separators when the output is xml", () => {
      const data: string = `ProductID*4*23~ProductID*a*b*c*d*e~AddressID*42*108~`;
      const result: InputData | string = StringParser.parseString(data, {
        elementSeparator,
        lineSeparator,
        output: "xml",
      });
      expect(result).toEqual(
        "<ProductID><ProductID1>a</ProductID1></ProductID><ProductID><ProductID2>b</ProductID2></ProductID><ProductID><ProductID3>c</ProductID3></ProductID><ProductID><ProductID4>d</ProductID4></ProductID><ProductID><ProductID5>e</ProductID5></ProductID><AddressID><AddressID1>42</AddressID1></AddressID><AddressID><AddressID2>108</AddressID2></AddressID>",
      );
    });

    test("A valid JSON object is created using the separators when the output is json", () => {
      const data: string = `ProductID*4*23~ProductID*a*b*c*d*e~AddressID*42*108~`;
      const result: InputData | string = StringParser.parseString(data, {
        elementSeparator,
        lineSeparator,
        output: "json",
      });
      expect(result).toEqual({
        AddressID: [{ AddressID1: "42" }, { AddressID2: "108" }],
        ProductID: [
          { ProductID1: "a" },
          { ProductID2: "b" },
          { ProductID3: "c" },
          { ProductID4: "d" },
          { ProductID5: "e" },
        ],
      });
    });
  });
});
