import { ParseDocumentParams } from "src/types/ParseDocumentParams";
import { OutputJson } from "./inputDataParser";

export interface Parser {
  parse: (data: string, body: ParseDocumentParams) => string | OutputJson;
}
