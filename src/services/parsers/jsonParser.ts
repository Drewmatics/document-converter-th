import { BadRequestException } from "@nestjs/common";
import { DocumentRequestParams } from "src/types/ParseDocumentParams";
import { isValidInputData } from "../../types/schemas/InputDataSchema";
import { OutputJson, resolveInputData } from "./inputDataParser";

export function parseJson(
  data: string,
  body: DocumentRequestParams,
): string | OutputJson {
  try {
    const document = JSON.parse(data);
    if (!isValidInputData(document)) {
      throw new BadRequestException(
        "The segments and elements of the Document are not in the correct format.",
      );
    }
    return resolveInputData(document, body);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new BadRequestException({
        message: "The JSON file is in an invalid format.",
      });
    }
    throw err;
  }
}
