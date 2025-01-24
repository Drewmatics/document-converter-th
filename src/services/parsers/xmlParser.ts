import { BadRequestException } from "@nestjs/common";
import { DocumentRequestParams } from "src/types/ParseDocumentParams";
import { isValidInputData } from "../../types/schemas/InputDataSchema";
import { OutputJson, resolveInputData } from "./inputDataParser";
import { XMLParser } from "fast-xml-parser";

export function parseXml(
  data: string,
  parser: XMLParser,
  body: DocumentRequestParams,
): string | OutputJson {
  const inputData = parser.parse(data);
  if (!isValidInputData(inputData)) {
    throw new BadRequestException(
      "The segments and elements of the Document are not in the correct format.",
    );
  }
  return resolveInputData(inputData, body);
}
