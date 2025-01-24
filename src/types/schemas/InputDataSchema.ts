import { InputData, InputElement } from "../InputData";
import { BadRequestException } from "@nestjs/common";

export function isValidInputData(document: any): document is InputData {
  for (const [segmentName, elements] of Object.entries<InputElement[]>(
    document,
  )) {
    for (const element of elements) {
      for (const [name] of Object.entries(element)) {
        if (!name.startsWith(segmentName)) {
          throw new BadRequestException(
            `Element with name: ${name} does not start with its corresponding segment name: ${segmentName}`,
          );
        }
        let index = name.substring(segmentName.length)
        if (!Number.isInteger(+index)) {
          throw new BadRequestException(`Element with name: ${name} cannot be tied to its corresponding segment name: ${segmentName}. The element's name must be prefixed with the segment name and suffixed with a number.`)
        }
      }
    }
  }
  return true;
}
