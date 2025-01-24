import { InputData } from "src/types/InputData";
import * as resolveInputData from "../../../../src/services/helpers/resolveInputData";
import { ParseDocumentParams } from "src/types/ParseDocumentParams";

describe("inputDataParser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Given I have valid Input Data", () => {
    let data: InputData;
    let body: ParseDocumentParams;
    beforeAll(() => {
      data = {
        ProductID: [
          {
            ProductID1: "a",
          },
          {
            ProductID1: "b",
          }
        ],
        AddressID: [
          {
            AddressID1: "42",
            AddressID2: "108",
          },
        ],
      };
      body = {
        lineSeparator: "~",
        elementSeparator: "*",
        output: "json",
      };
    });

    test("The InputData is transformed to a string using the separators if the output parameter is string", () => {
      body.output = "string";
      const result = resolveInputData.resolveInputData(data, body);
      expect(result).toBe(
        "ProductID*a~ProductID*b~AddressID*42*108~",
      );
    });

    test("The InputData is transformed to a valid string when there are multiple segments with same keys", () => {
      body.output = "string";
      data = {
        ProductID: [
          {
            ProductID1: "a",
            ProductID2: "b",
          },
          {
            ProductID1: "c",
            ProductID2: "d",
            ProductID3: "e",
          },
        ],
      };
      const result = resolveInputData.resolveInputData(data, body);
      expect(result).toBe("ProductID*a*b~ProductID*c*d*e~");
    });

    test("The InputData is transformed to a JSON object if the output parameter is json", () => {
      body.output = "json";
      const result = resolveInputData.resolveInputData(data, body);
      expect(result).toMatchObject(data);
    });

    test("The InputData is transformed to an XML object if the output parameter is xml", () => {
      body.output = "xml";
      const result = resolveInputData.resolveInputData(data, body);
      expect(result).toEqual(
        "<root><ProductID><ProductID1>a</ProductID1><ProductID2>b</ProductID2></ProductID><ProductID><ProductID1>c</ProductID1><ProductID2>d</ProductID2><ProductID3>e</ProductID3></ProductID></root>",
      );
    });
  });
});
