import { InputData, InputElement } from "../../../src/types/InputData";
import { ParseDocumentParams } from "../../../src/types/ParseDocumentParams";
import { Formatter } from "./formatter";

export class StringFormatter implements Formatter {
  format(inputData: InputData, params: ParseDocumentParams): string {
    let result: string = "";
    const segments = Object.entries<InputElement[]>(inputData);
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
}
