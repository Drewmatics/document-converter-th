import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { XMLParser } from "fast-xml-parser";
import { parseJson } from "src/services/handlers/jsonHandler";
import { parseString } from "src/services/handlers/stringHandler";
import { parseXml } from "src/services/handlers/xmlHandler";
import { getValidationErrors, isDocumentRequestParams } from "src/types/DocumentRequestParams";

@Controller("documents")
export class DocumentsController {
  @Get()
  getAll(): string {
    return "This action returns all documents";
  }

  @Get(":id")
  getById(@Param("id") id: string): string {
    return `This action returns a single document with id: ${id}`;
  }

  @Post('parse')
  @UseInterceptors(FileInterceptor('file'))
  parse(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    if (!isDocumentRequestParams(body)) {
      throw new BadRequestException(getValidationErrors(body))
    }
    switch (file.mimetype) {
      case 'text/plain':
        //security vulnerability! validate this (XSS)
        if (body.output == 'string') {
          throw new BadRequestException('Parsing documents with the same input and output type is not allowed.')
        }
        let stringData: string = Buffer.from(file.buffer).toString()
        return parseString(stringData, body)
      case 'application/json':
        if (body.output == 'json') {
          throw new BadRequestException('Parsing documents with the same input and output type is not allowed.')
        }
        let jsonData: string = Buffer.from(file.buffer).toString()
        return parseJson(jsonData, body)
      case 'application/xml':
        if (body.output == 'xml') {
          throw new BadRequestException('Parsing documents with the same input and output type is not allowed.')
        }
        let xmlData: string = Buffer.from(file.buffer).toString()
        const xmlParser = new XMLParser({
          isArray: (name, jpath, isLeafNode) => !isLeafNode,
        })
        return parseXml(xmlData, xmlParser, body)
    }
  }
}
