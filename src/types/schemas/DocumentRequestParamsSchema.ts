import { z } from "zod";
export const DocumentRequestParamsSchema = z.object({
  elementSeparator: z
    .string()
    .length(1, {
      message: "The elementSeparator must be a single character.",
    })
    .optional(),
  lineSeparator: z
    .string()
    .length(1, {
      message: "The lineSeparator must be a single character.",
    })
    .optional(),
  output: z.enum(["json", "string", "xml"], {
    message: `The 'output' field must be one of the following: json, string, xml.`,
  }),
});
