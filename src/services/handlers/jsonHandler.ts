import { BadRequestException } from "@nestjs/common";
import { DocumentRequestParams } from "src/types/DocumentRequestParams";
import { isResultDocument } from "src/types/schemas/ResultDocumentSchema";
import { resolveDocument } from "./documentHandler";

export function parseJson(
    data: string,
    body: DocumentRequestParams
) {
    try {
        let document = JSON.parse(data)
        if (!isResultDocument(document)) {
            throw new BadRequestException('The segments and elements of the Document are not in the correct format.')
        }
        return resolveDocument(document, body)
    }
    catch (err) {
        if (err instanceof SyntaxError) {
            throw new BadRequestException({
                message: 'The JSON file is in an invalid format.'
            })
        }
        throw err
    }
}