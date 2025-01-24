import { ParseDocumentParams } from "src/types/ParseDocumentParams";
import { OutputJson, resolveInputData } from "./inputDataParser";
import { XMLParser } from "fast-xml-parser";

/**
 * Parses XML, validates it, and transforms it into either plain-text or JSON.
 *
 * @param {string} data - The XML being converted
 * @param {XMLParser} parser - A third-party library used to help parse the XML
 * @param {ParseDocumentParams} body - Parameters from the API Request
 * @returns - Either plain-text or JSON, depending on the body's output parameter.
 */
export function parseXml(
  data: string,
  parser: XMLParser,
  body: ParseDocumentParams,
): string | OutputJson {
  let inputData = parser.parse(data);
  if (inputData.root) {
    inputData = inputData.root[0];
  }
  return resolveInputData(inputData, body);
}
