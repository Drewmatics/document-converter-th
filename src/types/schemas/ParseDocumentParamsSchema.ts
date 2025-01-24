import { z } from "zod";
export const ParseDocumentParamsSchema = z.object({
  elementSeparator: z
    .string({
      message: "An elementSeparator as a single character is required.",
    })
    .length(1, {
      message: "The elementSeparator must be a single character.",
    }),
  lineSeparator: z
    .string({ message: "A lineSeparator as a single character is required." })
    .length(1, {
      message: "The lineSeparator must be a single character.",
    }),
  output: z.enum(["json", "string", "xml"], {
    message: `The 'output' field must be one of the following: json, string, xml.`,
  }),
});
