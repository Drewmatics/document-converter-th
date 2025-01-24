import {
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { DocumentsService } from "../services/documentsService";

@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post("parse")
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("file"))
  parse(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.documentsService.parse(file, body);
  }
}
