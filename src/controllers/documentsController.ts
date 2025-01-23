import { Controller, Get, Param } from "@nestjs/common";

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
}
