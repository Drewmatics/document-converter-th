import { InputElement, InputData } from "src/types/InputData";
import { XMLBuilder } from "fast-xml-parser";
import { DocumentRequestParams } from "src/types/ParseDocumentParams";

export type OutputJson = InputData;

export function resolveInputData(
  inputData: InputData,
  params: DocumentRequestParams,
): string | OutputJson {
  switch (params.output) {
    case "string":
      return getString(inputData, params);
    case "json":
      return inputData;
    case "xml":
      return new XMLBuilder().build(inputData);
  }
}

function getString(document: InputData, params: DocumentRequestParams): string {
  let result: string = "";
  const segments = Object.entries<InputElement[]>(document);
  segments.forEach(([segmentName, elements]: [string, InputElement[]]) => {
    result += segmentName;
    for (const element of elements) {
      for (const [name, value] of Object.entries(element)) {
        result += `${params.elementSeparator}${value}`;
      }
    }
    result += params.lineSeparator;
  });
  return result;
}
