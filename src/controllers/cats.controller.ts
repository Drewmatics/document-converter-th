import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  getAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  getById(@Param('id') id: string): string {
    return `This action returns a single cat with id: ${id}`;
  }
}
