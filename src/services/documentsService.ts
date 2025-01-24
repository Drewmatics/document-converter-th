import {
  BadRequestException,
  Body,
  Injectable,
  UploadedFile,
} from "@nestjs/common";
import { XMLParser } from "fast-xml-parser";
import { JsonParser } from "../services/parsers/jsonParser";
import { parseString } from "../services/parsers/stringParser";
import { parseXml } from "../services/parsers/xmlParser";
import {
  getValidationErrors,
  isDocumentRequestParams,
} from "../types/ParseDocumentParams";

@Injectable()
export class DocumentsService {
  parse(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    if (!isDocumentRequestParams(body)) {
      throw new BadRequestException(getValidationErrors(body));
    }
    switch (file.mimetype) {
      case "text/plain":
        if (body.output == "string") {
          throw new BadRequestException(
            "Parsing documents with the same input and output type is not allowed.",
          );
        }
        const stringData: string = Buffer.from(file.buffer).toString();
        return parseString(stringData, body);
      case "application/json":
        if (body.output == "json") {
          throw new BadRequestException(
            "Parsing documents with the same input and output type is not allowed.",
          );
        }
        const jsonData: string = Buffer.from(file.buffer).toString();
        return new JsonParser().parse(jsonData, body);
      case "application/xml":
        if (body.output == "xml") {
          throw new BadRequestException(
            "Parsing documents with the same input and output type is not allowed.",
          );
        }
        const xmlData: string = Buffer.from(file.buffer).toString();
        const xmlParser = new XMLParser({
          isArray: (name, jpath, isLeafNode) => !isLeafNode,
        });
        return parseXml(xmlData, xmlParser, body);
      default:
        throw new BadRequestException("Unsupported extension");
    }
  }
}
