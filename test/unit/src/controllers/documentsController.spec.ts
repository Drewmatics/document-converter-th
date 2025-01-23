import { Test, TestingModule } from "@nestjs/testing";
import { DocumentsController } from "../../../../src/controllers/documentsController";
import * as parseJson from "../../../../src/services/parsers/jsonParser";
import * as parseString from "../../../../src/services/parsers/stringParser";
import * as parseXml from "../../../../src/services/parsers/xmlParser";
import { ResultDocument } from "src/types/ResultDocument";
import { DocumentRequestParams } from "src/types/DocumentRequestParams";
import { XMLParser } from "fast-xml-parser";
import { BadRequestException } from "@nestjs/common";

describe("DocumentsController", () => {
  let controller: DocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
    }).compile();
    jest.spyOn(parseJson, "parseJson").mockImplementation(() => "result");
    jest.spyOn(parseXml, "parseXml").mockImplementation(() => "result");
    jest.spyOn(parseString, "parseString").mockImplementation(() => "result");

    controller = module.get<DocumentsController>(DocumentsController);
  });

  describe("When a JSON file is sent", () => {
    let result: ResultDocument | string | undefined;
    let json: any;
    let body: DocumentRequestParams;
    beforeEach(() => {
      json = {
        ProductID: [
          {
            something: "4",
            ProductID2: "8",
            ProductID3: "15",
            ProductID4: "16",
            ProductID5: "23",
          },
        ],
      };
      const file = {
        buffer: Buffer.from(JSON.stringify(json)),
        mimetype: "application/json",
      } as Express.Multer.File;

      body = {
        lineSeparator: "~",
        elementSeparator: "-",
        output: "string",
      };
      result = controller.parse(file, body);
    });

    it("Then the JSON parser is called", () => {
      expect(parseJson.parseJson).toHaveBeenCalledWith(
        JSON.stringify(json),
        body,
      );
      expect(result).toEqual("result");
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("When an XML file is sent", () => {
    let result: ResultDocument | string | undefined;
    let xml: string;
    let body: DocumentRequestParams;
    beforeEach(() => {
      xml = `<ProductID>
    <ProductID1>4</ProductID1>
    <ProductID2>8</ProductID2>
    <ProductID3>15</ProductID3>
    <ProductID4>16</ProductID4>
    <ProductID5>23</ProductID5>
</ProductID>`;
      const file = {
        buffer: Buffer.from(xml),
        mimetype: "application/xml",
      } as Express.Multer.File;

      body = {
        lineSeparator: "~",
        elementSeparator: "-",
        output: "string",
      };
      result = controller.parse(file, body);
    });

    it("Then the XML parser is called", () => {
      expect(parseXml.parseXml).toHaveBeenCalledWith(
        xml,
        expect.any(XMLParser),
        body,
      );
      expect(result).toEqual("result");
    });
  });

  describe("When a String file is sent", () => {
    let result: ResultDocument | string | undefined;
    let str: string;
    let body: DocumentRequestParams;
    let file: Express.Multer.File;
    beforeEach(() => {
      str = `ProductID*4*8*15*16*23~ProductID*a*b*c*d*e~AddressID*42*108*3*14~ContactID*59*26~`;
      file = {
        buffer: Buffer.from(str),
        mimetype: "text/plain",
      } as Express.Multer.File;

      body = {
        lineSeparator: "~",
        elementSeparator: "-",
        output: "xml",
      };
    });

    it("Then the String parser is called", () => {
      result = controller.parse(file, body);

      expect(parseString.parseString).toHaveBeenCalledWith(str, body);
      expect(result).toEqual("result");
    });

    it("Then a BadRequestException is thrown there is no lineSeparator", () => {
      body = {
        elementSeparator: "-",
        output: "xml",
      } as DocumentRequestParams;

      expect(() => controller.parse(file, body)).toThrow(BadRequestException);
    });

    it("Then a BadRequestException is thrown when the output type is string", () => {
      body.output = "string";
      expect(() => controller.parse(file, body)).toThrow(BadRequestException);
    });
  });
});
