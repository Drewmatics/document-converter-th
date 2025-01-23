import { BadRequestException } from "@nestjs/common";
import { DocumentRequestParams } from "src/types/DocumentRequestParams";
import { isResultDocument } from "../../types/schemas/ResultDocumentSchema";
import { resolveDocument } from "../handlers/documentHandler";

export function parseJson(data: string, body: DocumentRequestParams) {
  try {
    const document = JSON.parse(data);
    if (!isResultDocument(document)) {
      throw new BadRequestException(
        "The segments and elements of the Document are not in the correct format.",
      );
    }
    return resolveDocument(document, body);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new BadRequestException({
        message: "The JSON file is in an invalid format.",
      });
    }
    throw err;
  }
}
