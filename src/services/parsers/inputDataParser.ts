import { InputElement, InputData } from "src/types/InputData";
import { XMLBuilder } from "fast-xml-parser";
import { ParseDocumentParams } from "src/types/ParseDocumentParams";
import { isValidInputData } from "../../types/schemas/InputDataSchema";
import { BadRequestException } from "@nestjs/common";

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
      return getString(inputData, params);
    case "json":
      return inputData;
    case "xml":
      return new XMLBuilder().build({
        root: inputData
    });
  }
}

function getString(document: InputData, params: ParseDocumentParams): string {
  let result: string = "";
  const segments = Object.entries<InputElement[]>(document);
  segments.forEach(([segmentName, elements]: [string, InputElement[]]) => {
    for (const element of elements) {
      result += segmentName;
      for (const [name, value] of Object.entries(element)) {
        result += `${params.elementSeparator}${value}`;
      }
      result += params.lineSeparator;
    }
  });
  return result;
}
