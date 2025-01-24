import { InputData } from "src/types/InputData";
import * as JsonParser from "../../../../src/services/parsers/jsonParser";
import { BadRequestException } from "@nestjs/common";

describe("jsonParser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Given I have a line and element separators", () => {
    let lineSeparator: string;
    let elementSeparator: string;
    let data: InputData;
    beforeAll(() => {
      lineSeparator = "~";
      elementSeparator = "*";
      data = {
        ProductID: [
          {
            ProductID1: "a",
            ProductID2: "b",
            ProductID3: "c",
            ProductID4: "d",
            ProductID5: "e",
          },
        ],
        AddressID: [
          {
            AddressID1: "42",
            AddressID2: "108",
          },
        ],
      };
    });

    test("A BadRequestException is thrown if the JSON is not valid input data", () => {
      const invalidData = JSON.stringify({
        ProductID: [
          {
            isNotPrefixedWithProductID: "4",
            ProductID2: "8",
            ProductID3: "15",
            ProductID4: "16",
            ProductID5: "23",
          },
          {
            ProductID1: "a",
            ProductID2: "b",
            ProductID3: "c",
            ProductID4: "d",
            ProductID5: "e",
          },
        ],
      });
      expect(() =>
        JsonParser.parseJson(invalidData, {
          elementSeparator,
          lineSeparator,
          output: "string",
        }),
      ).toThrow(BadRequestException);
    });

    test("A valid XML String is created using the separators when the output is xml", () => {
      const result: InputData | string = JsonParser.parseJson(
        JSON.stringify(data),
        {
          elementSeparator,
          lineSeparator,
          output: "xml",
        },
      );
      expect(result).toEqual(
        "<root><ProductID><ProductID1>a</ProductID1><ProductID2>b</ProductID2><ProductID3>c</ProductID3><ProductID4>d</ProductID4><ProductID5>e</ProductID5></ProductID><AddressID><AddressID1>42</AddressID1><AddressID2>108</AddressID2></AddressID></root>",
      );
    });

    test("Empty values and whitespace are handled gracefully", () => {
      const result: InputData | string = JsonParser.parseJson(
        JSON.stringify({
          ProductID: [
            {
              ProductID1: "",
              ProductID2: "   Hello ",
              ProductID3: "",
              ProductID4: "123",
            },
          ],
        }),
        {
          elementSeparator,
          lineSeparator,
          output: "string",
        },
      );
      expect(result).toEqual("ProductID**   Hello **123~");
    });

    test("A valid string is created using the separators when the output is string", () => {
      const result: InputData | string = JsonParser.parseJson(
        JSON.stringify(data),
        {
          elementSeparator,
          lineSeparator,
          output: "string",
        },
      );
      expect(result).toEqual("ProductID*a*b*c*d*e~AddressID*42*108~");
    });
  });
});
