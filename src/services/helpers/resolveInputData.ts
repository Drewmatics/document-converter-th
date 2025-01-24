import { InputData } from "src/types/InputData";
import { ParseDocumentParams } from "src/types/ParseDocumentParams";
import { isValidInputData } from "../../types/schemas/InputDataSchema";
import { BadRequestException } from "@nestjs/common";
import { StringFormatter } from "../formatters/stringFormatter";
import { XMLBuilder } from "fast-xml-parser";

export type OutputJson = InputData;

export function resolveInputData(
  inputData: InputData,
  params: ParseDocumentParams,
): string | OutputJson {
  if (!isValidInputData(inputData)) {
    throw new BadRequestException(
      "The segments and elements of the Document are not in the correct format.",
    );
  }
  switch (params.output) {
    case "string":
      return new StringFormatter().format(inputData, params);
    case "json":
      return inputData;
    case "xml":
      return new XMLBuilder().build({
        root: inputData,
      });
  }
}
