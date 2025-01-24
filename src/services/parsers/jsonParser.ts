import { BadRequestException } from "@nestjs/common";
import { ParseDocumentParams } from "src/types/ParseDocumentParams";
import { isValidInputData } from "../../types/schemas/InputDataSchema";
import { OutputJson, resolveInputData } from "./inputDataParser";

export function parseJson(
  data: string,
  body: ParseDocumentParams,
): string | OutputJson {
  try {
    const inputData = JSON.parse(data);
    if (!isValidInputData(inputData)) {
      throw new BadRequestException(
        "The segments and elements of the Document are not in the correct format.",
      );
    }
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
