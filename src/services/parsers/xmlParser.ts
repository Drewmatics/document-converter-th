import { BadRequestException } from "@nestjs/common";
import { DocumentRequestParams } from "src/types/ParseDocumentParams";
import { isValidInputData } from "../../types/schemas/InputDataSchema";
import { resolveInputData } from "./inputDataParser";
import { XMLParser } from "fast-xml-parser";

export function parseXml(
  data: string,
  parser: XMLParser,
  body: DocumentRequestParams,
) {
  try {
    const json = parser.parse(data);
    if (!isValidInputData(json)) {
      throw new BadRequestException(
        "The segments and elements of the Document are not in the correct format.",
      );
    }
    return resolveInputData(json, body);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new BadRequestException({
        message: "The XML file is in an invalid format.",
      });
    }
    throw err;
  }
}
