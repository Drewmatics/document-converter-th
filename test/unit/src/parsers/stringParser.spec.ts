import { InputData } from "src/types/InputData";
import { StringParser } from "../../../../src/services/parsers/stringParser";
import { BadRequestException } from "@nestjs/common";

describe("stringParser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Given I have a line and element separators", () => {
    let lineSeparator: string;
    let elementSeparator: string;
    let stringParser: StringParser;
    beforeAll(() => {
      stringParser = new StringParser();
      lineSeparator = "~";
      elementSeparator = "*";
    });

    test("A BadRequestException is thrown when the string does not contain the line separator", () => {
      const data: string = `ProductID*4*23`;
      expect(() =>
        stringParser.parse(data, {
          elementSeparator,
          lineSeparator,
          output: "json",
        }),
      ).toThrow(BadRequestException);
    });

    test("A valid XML String is created using the separators when the output is xml", () => {
      const data: string = `ProductID*4*23~ProductID*a*b*c*d*e~AddressID*42*108~`;
      const result: InputData | string = stringParser.parse(data, {
        elementSeparator,
        lineSeparator,
        output: "xml",
      });
      expect(result).toEqual(
        "<root><ProductID><ProductID1>4</ProductID1><ProductID2>23</ProductID2></ProductID><ProductID><ProductID1>a</ProductID1><ProductID2>b</ProductID2><ProductID3>c</ProductID3><ProductID4>d</ProductID4><ProductID5>e</ProductID5></ProductID><AddressID><AddressID1>42</AddressID1><AddressID2>108</AddressID2></AddressID></root>",
      );
    });

    test("A valid JSON object is created using the separators when the output is json", () => {
      const data: string = `ProductID*4*23~ProductID*a*b*c*d*e~`;
      const result: InputData | string = stringParser.parse(data, {
        elementSeparator,
        lineSeparator,
        output: "json",
      });
      expect(result).toMatchObject({
        ProductID: [
          { ProductID1: "4", ProductID2: "23" },
          {
            ProductID1: "a",
            ProductID2: "b",
            ProductID3: "c",
            ProductID4: "d",
            ProductID5: "e",
          },
        ],
      });
    });

    test("A valid JSON object is created using the separators with multiple keys when the output is json", () => {
      const data: string = `ProductID*4*23~ProductID*a*b*c*d*e~AddressID*123*456~`;
      const json: InputData | string = stringParser.parse(data, {
        elementSeparator,
        lineSeparator,
        output: "json",
      });
      expect(json).toEqual({
        AddressID: [{ AddressID1: "123", AddressID2: "456" }],
        ProductID: [
          { ProductID1: "4", ProductID2: "23" },
          {
            ProductID1: "a",
            ProductID2: "b",
            ProductID3: "c",
            ProductID4: "d",
            ProductID5: "e",
          },
        ],
      });
    });
  });
});
