import { DocumentElement, ResultDocument } from "src/types/ResultDocument";
import { XMLBuilder } from "fast-xml-parser";
import { DocumentRequestParams } from "src/types/DocumentRequestParams";

export function resolveDocument(
  document: ResultDocument,
  params: DocumentRequestParams,
): string | ResultDocument {
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
  document: ResultDocument,
  params: DocumentRequestParams,
): string {
  let result: string = "";
  const segments = Object.entries<DocumentElement[]>(document);
  segments.forEach(([segmentName, elements]: [string, DocumentElement[]]) => {
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
