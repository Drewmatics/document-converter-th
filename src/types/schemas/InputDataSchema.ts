import { InputData, InputElement } from "../InputData";
import { BadRequestException } from "@nestjs/common";

/**
 * The InputData object represents the data coming from any file type
 * With this interface, we can easily extend our input and output file types and easily support more
 * isValidInputData makes sure that the segments and elements are correctly named
 *
 * @param {any} inputData - The Document's data
 * @returns - True if InputData is valid and guards type, throws Bad Requests otherwise
 */
export function isValidInputData(inputData: any): inputData is InputData {
  for (const [segmentName, elements] of Object.entries<InputElement[]>(
    inputData,
  )) {
    for (const element of elements) {
      const length = Object.entries(element).length;
      for (const [name] of Object.entries(element)) {
        if (!name.startsWith(segmentName)) {
          throw new BadRequestException(
            `Element with name: ${name} does not start with its corresponding segment name: ${segmentName}`,
          );
        }
        const index = name.substring(segmentName.length);
        if (!Number.isInteger(+index) || +index > length) {
          throw new BadRequestException(
            `Element with name: ${name} cannot be tied to its corresponding segment name: ${segmentName}. The element's name must be prefixed with the segment name and suffixed with a number with a maximum of ${length}.`,
          );
        }
      }
    }
  }
  return true;
}
