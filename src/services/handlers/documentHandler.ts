import { InputElement, InputData } from "src/types/InputData";
import { XMLBuilder } from "fast-xml-parser";
import { DocumentRequestParams } from "src/types/ParseDocumentParams";

export function resolveDocument(
  document: InputData,
  params: DocumentRequestParams,
): string | InputData {
  switch (params.output) {
    case "string":
      return getString(document, params);
    case "json":
      return document;
    case "xml":
      return new XMLBuilder().build(document);
  }
}

function getString(
  document: InputData,
  params: DocumentRequestParams,
): string {
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
