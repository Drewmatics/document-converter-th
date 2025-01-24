import { ParseDocumentParams } from "src/types/ParseDocumentParams";
import { OutputJson } from "../helpers/resolveInputData";

export interface Parser {
  parse: (data: string, body: ParseDocumentParams) => string | OutputJson;
}
