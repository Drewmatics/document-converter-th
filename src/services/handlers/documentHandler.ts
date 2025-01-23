import { DocumentElement, ResultDocument } from "src/types/ResultDocument";
import { jsXml } from 'json-xml-parse'
import { DocumentRequestParams } from "src/types/DocumentRequestParams";

export function resolveDocument(document: ResultDocument, params: DocumentRequestParams) {
    switch (params.output) {
        case 'string':
            return getString(document, params)
        case 'json':
            return document
        case 'xml':
            return jsXml.toXmlString(document)
    }
}

function getString(document: ResultDocument, params: DocumentRequestParams): string {
    let result: string = ""
    const segments  = Object.entries<DocumentElement[]>(document)
    segments.forEach(([segmentName, elements]: [string, DocumentElement[]]) => {
        result += segmentName
        for(var element of elements) {
            for(var [name, value] of Object.entries(element)) {
                result += `${params.elementSeparator}${value}`
            }
        }
        result += params.lineSeparator
    })
    return result
}