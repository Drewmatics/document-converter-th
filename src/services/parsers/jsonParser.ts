import { BadRequestException } from "@nestjs/common";
import { ParseDocumentParams } from "src/types/ParseDocumentParams";
import { OutputJson, resolveInputData } from "./inputDataParser";

/**
 * Parses a JSON Object, validates it, and transforms it into either plain-text or XML.
 *
 * @param {string} data - JSON Object represented as string
 * @param {ParseDocumentParams} body - Parameters from the API Request.
 * @returns - Either a plain-text string or XML, depending on the body's output parameter.
 */
export function parseJson(
  data: string,
  body: ParseDocumentParams,
): string | OutputJson {
  try {
    const inputData = JSON.parse(data);
    return resolveInputData(inputData, body);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new BadRequestException({
        message: "The JSON file is in an invalid format.",
      });
    }
    throw err;
  }
}
