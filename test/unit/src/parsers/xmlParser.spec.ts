import { InputData } from "src/types/InputData";
import * as XmlParser from "../../../../src/services/parsers/xmlParser";
import { BadRequestException } from "@nestjs/common";
import { XMLParser } from "fast-xml-parser";

describe("xmlParser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Given I have a line and element separators", () => {
    let lineSeparator: string;
    let elementSeparator: string;
    let xmlData: string;
    let xmlParser: XMLParser;
    beforeAll(() => {
      xmlParser = new XMLParser({
        isArray: (name, jpath, isLeafNode) => !isLeafNode,
      });
      lineSeparator = "~";
      elementSeparator = "*";
      xmlData = `<ProductID>
	<ProductID1>a</ProductID1>
</ProductID>
<ProductID>
	<ProductID2>b</ProductID2>
</ProductID>
<ProductID>
	<ProductID3>c</ProductID3>
</ProductID>
<ProductID>
	<ProductID4>d</ProductID4>
</ProductID>
<ProductID>
	<ProductID5>e</ProductID5>
</ProductID>
<AddressID>
	<AddressID1>42</AddressID1>
</AddressID>
<AddressID>
	<AddressID2>108</AddressID2>
</AddressID>`;
    });

    test("A BadRequestException is thrown when the XML is not valid input data", () => {
      const invalidXml: string = `<AddressID>
	<invalid1>42</invalid1>
</AddressID>
<AddressID>
	<AddressID2>108</AddressID2>
</AddressID>`;
      expect(() =>
        XmlParser.parseXml(invalidXml, xmlParser, {
          elementSeparator,
          lineSeparator,
          output: "xml",
        }),
      ).toThrow(BadRequestException);
    });

    test("A valid String is created using the separators when the output is string", () => {
      const result: InputData | string = XmlParser.parseXml(
        xmlData,
        xmlParser,
        {
          elementSeparator,
          lineSeparator,
          output: "xml",
        },
      );
      expect(result).toEqual(
        "<ProductID><ProductID1>a</ProductID1></ProductID><ProductID><ProductID2>b</ProductID2></ProductID><ProductID><ProductID3>c</ProductID3></ProductID><ProductID><ProductID4>d</ProductID4></ProductID><ProductID><ProductID5>e</ProductID5></ProductID><AddressID><AddressID1>42</AddressID1></AddressID><AddressID><AddressID2>108</AddressID2></AddressID>",
      );
    });

    test("A valid JSON object is created using the separators when the output is json", () => {
      const result: InputData | string = XmlParser.parseXml(
        xmlData,
        xmlParser,
        {
          elementSeparator,
          lineSeparator,
          output: "json",
        },
      );
      expect(result).toEqual({
        AddressID: [{ AddressID1: 42 }, { AddressID2: 108 }],
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
