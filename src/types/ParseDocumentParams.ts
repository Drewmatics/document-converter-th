import { ParseDocumentParamsSchema } from "./schemas/ParseDocumentParamsSchema";

export interface ParseDocumentParams {
  elementSeparator: string;
  lineSeparator: string;
  output: "json" | "string" | "xml";
}

export function isDocumentRequestParams(
  params: any,
): params is ParseDocumentParams {
  const result = ParseDocumentParamsSchema.safeParse(params).success;
  return result;
}

export function getValidationErrors(params: any): string[] | undefined {
  return ParseDocumentParamsSchema.safeParse(params).error?.errors.map(
    (error) => error.message,
  );
}
