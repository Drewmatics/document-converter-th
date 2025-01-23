import { DocumentRequestParamsSchema } from './schemas/DocumentRequestParamsSchema';

export interface DocumentRequestParams {
    elementSeparator: string
    lineSeparator: string
    output: 'json' | 'string' | 'xml'
    trimEmpties: boolean
    trimWhitespace: boolean
}

export function isDocumentRequestParams(params: any): params is DocumentRequestParams {
    var result = DocumentRequestParamsSchema.safeParse(params).success
    return result
}

export function getValidationErrors(params: any): string[] | undefined {
    return DocumentRequestParamsSchema.safeParse(params).error?.errors.map(error => error.message)
}