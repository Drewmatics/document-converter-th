import { DocumentRequestParams } from "src/types/DocumentRequestParams";
import { resolveDocument } from "./documentHandler";
import { ResultDocument } from "src/types/ResultDocument";

export function parseString(
    data: string,
    body: DocumentRequestParams
) {
    let document = getDocument(data, body)
    return resolveDocument(document, body)
}

function getDocument(data: string, body: DocumentRequestParams): ResultDocument {
    let document: ResultDocument = {}
    data = removeLineBreaks(data)
    const segments: string[] = data.split(body.lineSeparator)
    segments.forEach((segment: string) => {
        if (!segment.length) {
            return
        }
        const elements: string[] = segment.split(body.elementSeparator)
        const segmentName: string = elements[0]
        document[segmentName] = []
        elements.slice(1).forEach((value: string, index: number) => {
            if (body.trimWhitespace) {
                value = value.trim()
            }
            if (body.trimEmpties) {
                if (!value.length)
                    return
            }

            let element = {}
            element[`${segmentName}${index + 1}`] = value
            document[segmentName].push(element)
        })
    })
    return document
}

function removeLineBreaks(data: string): string {
    return data.replace(/(\r\n|\n|\r)/gm, "");
}