import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number) {
    const bookmark = await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
    return bookmark;
  }

  async getById(userId: number, id: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id,
        userId,
      },
    });
    return bookmark;
  }

  async create(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
    return bookmark;
  }

  async editById(userId: number, dto: EditBookmarkDto, id: number) {
    const chekBookmark = await this.prisma.bookmark.findUnique({
      where: {
        id,
      },
    });

    if (!chekBookmark || chekBookmark.userId !== userId)
      throw new ForbiddenException('Access to reasouse dinied');

    const bookmark = await this.prisma.bookmark.update({
      where: {
        id,
      },
      data: {
        userId,
        ...dto,
      },
    });
    return bookmark;
  }

  async deleteById(userId: number, id: number) {
    const chekBookmark = await this.prisma.bookmark.findUnique({
      where: {
        id,
      },
    });

    if (!chekBookmark || chekBookmark.userId !== userId)
      throw new ForbiddenException('Access to reasouse dinied');

    const bookmark = await this.prisma.bookmark.delete({
      where: {
        id,
      },
    });
  }
}
