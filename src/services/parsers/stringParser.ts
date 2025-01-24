import { DocumentRequestParams } from "src/types/ParseDocumentParams";
import { OutputJson, resolveInputData } from "./inputDataParser";
import { InputData } from "src/types/InputData";
import { BadRequestException } from "@nestjs/common";

export function parseString(
  data: string,
  body: DocumentRequestParams,
): string | OutputJson {
  if (!data.includes(body.lineSeparator)) {
    throw new BadRequestException(
      "At least one line separator must be included in the input string.",
    );
  }
  const inputData = transformToInputData(
    data,
    body.lineSeparator,
    body.elementSeparator,
  );
  return resolveInputData(inputData, body);
}

function transformToInputData(
  data: string,
  lineSeparator: string,
  elementSeparator: string,
): InputData {
  const document: InputData = {};
  data = removeLineBreaks(data);
  const segments: string[] = data.split(lineSeparator);
  segments.forEach((segment: string) => {
    if (!segment.length) {
      return;
    }
    const elements: string[] = segment.split(elementSeparator);
    const segmentName: string = elements[0];
    document[segmentName] = [];
    elements.slice(1).forEach((value: string, index: number) => {
      const element = {};
      element[`${segmentName}${index + 1}`] = value;
      document[segmentName].push(element);
    });
  });
  return document;
}

function removeLineBreaks(data: string): string {
  return data.replace(/(\r\n|\n|\r)/gm, "");
}
