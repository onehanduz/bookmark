import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Controller('bookmarks')
@UseGuards(JwtGuard)
export class BookmarkController {
  constructor(private service: BookmarkService) {}

  @Get()
  getAll(@GetUser('id') userId: number) {
    return this.service.getAll(userId);
  }

  @Get(':id')
  getById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.getById(userId, id);
  }

  @Post()
  create(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {
    return this.service.create(userId, dto);
  }

  @Patch(':id')
  editById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.service.editById(userId, dto, id);
  }

  @Delete(':id')
  deleteById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.deleteById(userId, id);
  }
}
