import { z } from 'zod';
import { ResultDocument, DocumentElement } from '../ResultDocument';
import { BadRequestException } from '@nestjs/common';

export const ElementsSchema = z.record(z.string(), z.array(z.string()))

export function isResultDocument(document: any): document is ResultDocument {
    for(const [segmentName, elements] of Object.entries<DocumentElement[]>(document)) {
        for(var element of elements) {
            for(var [name] of Object.entries(element)) {
                //TODO: add validation for indexNumber
                if (!name.startsWith(segmentName)) {
                    throw new BadRequestException(`Element with name: ${name} does not start with its corresponding segment name: ${segmentName}`)
                }
            }
        }
    }
    return true
}