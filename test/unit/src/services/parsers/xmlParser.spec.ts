import { InputData } from "src/types/InputData";
import { XmlParser } from "../../../../../src/services/parsers/xmlParser";
import { BadRequestException } from "@nestjs/common";

describe("xmlParser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Given I have a line and element separators", () => {
    let lineSeparator: string;
    let elementSeparator: string;
    let xmlData: string;
    let xmlParser: XmlParser;
    beforeAll(() => {
      xmlParser = new XmlParser();
      lineSeparator = "~";
      elementSeparator = "*";
      xmlData = `<ProductID>
    <ProductID1>4</ProductID1>
    <ProductID2>8</ProductID2>
    <ProductID3>15</ProductID3>
    <ProductID4>16</ProductID4>
    <ProductID5>23</ProductID5>
</ProductID>
<ProductID>
    <ProductID1>a</ProductID1>
    <ProductID2>b</ProductID2>
    <ProductID3>c</ProductID3>
    <ProductID4>d</ProductID4>
    <ProductID5>e</ProductID5>
</ProductID>
<AddressID>
    <AddressID1>42</AddressID1>
    <AddressID2>108</AddressID2>
    <AddressID3>3</AddressID3>
    <AddressID4>14</AddressID4>
</AddressID>
<ContactID>
    <ContactID1>59</ContactID1>
    <ContactID2>26</ContactID2>
</ContactID>`;
    });

    test("A BadRequestException is thrown when the XML is not valid input data", () => {
      const invalidXml: string = `<AddressID>
	<invalid1>42</invalid1>
</AddressID>
<AddressID>
	<AddressID2>108</AddressID2>
</AddressID>`;
      expect(() =>
        xmlParser.parse(invalidXml, {
          elementSeparator,
          lineSeparator,
          output: "json",
        }),
      ).toThrow(BadRequestException);
    });

    test("Version and root tags are ignored when parsing the XML file", () => {
      const xmlWithRootAndVersionTags: string = `
      <?xml version="1.0" encoding="UTF-8" ?>
<root>
<ProductID>
<ProductID1>4</ProductID1>
<ProductID2>5</ProductID2>
</ProductID>
</root>`;
      const result: InputData | string = xmlParser.parse(
        xmlWithRootAndVersionTags,
        {
          elementSeparator,
          lineSeparator,
          output: "json",
        },
      );
      expect(result).toMatchObject({
        ProductID: [
          {
            ProductID1: 4,
            ProductID2: 5,
          },
        ],
      });
    });

    test("A valid String is created using the separators when the output is string", () => {
      const result: InputData | string = xmlParser.parse(xmlData, {
        elementSeparator,
        lineSeparator,
        output: "string",
      });
      expect(result).toEqual(
        "ProductID*4*8*15*16*23~ProductID*a*b*c*d*e~AddressID*42*108*3*14~ContactID*59*26~",
      );
    });

    test("A valid JSON object is created using the separators when the output is json", () => {
      const result: InputData | string = xmlParser.parse(xmlData, {
        elementSeparator,
        lineSeparator,
        output: "json",
      });
      expect(result).toEqual({
        ProductID: [
          {
            ProductID1: 4,
            ProductID2: 8,
            ProductID3: 15,
            ProductID4: 16,
            ProductID5: 23,
          },
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
            AddressID1: 42,
            AddressID2: 108,
            AddressID3: 3,
            AddressID4: 14,
          },
        ],
        ContactID: [
          {
            ContactID1: 59,
            ContactID2: 26,
          },
        ],
      });
    });
  });
});
