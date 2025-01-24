import { ParseDocumentParams } from "src/types/ParseDocumentParams";
import { OutputJson, resolveInputData } from "../helpers/resolveInputData";
import * as FastXmlParser from "fast-xml-parser";
import { Parser } from "./parser";

/**
 * Parses XML, validates it, and transforms it into either plain-text or JSON.
 *
 * @param {string} data - The XML being converted
 * @param {XMLParser} parser - A third-party library used to help parse the XML
 * @param {ParseDocumentParams} body - Parameters from the API Request
 * @returns - Either plain-text or JSON, depending on the body's output parameter.
 */
export class XmlParser implements Parser {
  parse(data: string, body: ParseDocumentParams): string | OutputJson {
    const parser = new FastXmlParser.XMLParser({
      isArray: (name, jpath, isLeafNode) => !isLeafNode,
    });
    let inputData = parser.parse(data);
    if (inputData.root) {
      inputData = inputData.root[0];
    }
    return resolveInputData(inputData, body);
  }
}
