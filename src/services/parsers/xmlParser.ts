import { BadRequestException } from "@nestjs/common";
import { ParseDocumentParams } from "src/types/ParseDocumentParams";
import { isValidInputData } from "../../types/schemas/InputDataSchema";
import { OutputJson, resolveInputData } from "./inputDataParser";
import { XMLParser } from "fast-xml-parser";

export function parseXml(
  data: string,
  parser: XMLParser,
  body: ParseDocumentParams,
): string | OutputJson {
  let inputData = parser.parse(data);
  if (inputData.root) {
    inputData = inputData.root[0];
  }
  if (!isValidInputData(inputData)) {
    throw new BadRequestException(
      "The segments and elements of the Document are not in the correct format.",
    );
  }
  return resolveInputData(inputData, body);
}
