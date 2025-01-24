import { InputData } from "src/types/InputData";
import { ParseDocumentParams } from "src/types/ParseDocumentParams";

export interface Formatter {
  format(inputData: InputData, params: ParseDocumentParams): string;
}
