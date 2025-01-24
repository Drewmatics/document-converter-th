import { ParseDocumentParamsSchema } from "./schemas/ParseDocumentParamsSchema";

export interface DocumentRequestParams {
  elementSeparator: string;
  lineSeparator: string;
  output: "json" | "string" | "xml";
}

export function isDocumentRequestParams(
  params: any,
): params is DocumentRequestParams {
  const result = ParseDocumentParamsSchema.safeParse(params).success;
  return result;
}

export function getValidationErrors(params: any): string[] | undefined {
  return ParseDocumentParamsSchema.safeParse(params).error?.errors.map(
    (error) => error.message,
  );
}
