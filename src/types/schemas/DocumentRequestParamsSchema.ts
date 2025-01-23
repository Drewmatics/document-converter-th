import { z } from 'zod';
export const DocumentRequestParamsSchema = z.object({
    elementSeparator: z.string().length(1, { 
        message: 'The elementSeparator must be a single character.' 
    }),
    lineSeparator: z.string().length(1, { 
        message: 'The lineSeparator must be a single character.'
    }),
    output: z.enum(['json', 'string', 'xml'], {
        message: `The 'output' field must be one of the following: json, string, xml.`
    }),
    trimEmpties: z.string().refine((value) => value === "true" || value === "false", {
        message: "The 'trimEmpties' field must be either true or false.",
      }).transform((value) => value === "true"),
    trimWhitespace: z.string().refine((value) => value === "true" || value === "false", {
      message: "The 'trimWhiteSpace' field must be either true or false.",
    }).transform((value) => value === "true")
})