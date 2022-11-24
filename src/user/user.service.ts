import { HttpException, Injectable } from '@nestjs/common';
import { ErrorCode, ErrorMessage } from 'src/common/message-code';
import { Files } from 'src/entities/Files';
import { Users } from 'src/entities/Users';
import { DataSource } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  getUsers() {
    return this.dataSource.getRepository(Users).createQueryBuilder().getMany();
  }

  getUserByEmail(email: string) {
    return this.dataSource
      .getRepository(Users)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.fileId', 'file')
      .where('email=:email', { email })
      .getOne();
  }

  createUser(data: UserDto) {
    return this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([
        {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .execute();
  }

  async patchUserImage(email: string, file: Express.Multer.File) {
    const img = await this.dataSource
      .getRepository(Files)
      .createQueryBuilder('file')
      .leftJoinAndSelect('file.user', 'user')
      .where('user.email=:email', { email })
      .getOne();

    console.log(img);
    if (!img) {
      let isSuccess = true;
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const result = await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(Files)
          .values([
            {
              originalName: file.filename,
              path: '/public/profile/' + encodeURIComponent(file.filename),
              size: file.size,
              fileType: 'profile',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ])
          .execute();

        await queryRunner.manager
          .createQueryBuilder()
          .update(Users)
          .set({
            fileId: result.identifiers[0].id,
            updatedAt: new Date(),
          })
          .where('email=:email', { email })
          .execute();
        console.log('dd');
        await queryRunner.commitTransaction();
      } catch (err) {
        console.log(err);
        await queryRunner.rollbackTransaction();
        isSuccess = false;
      } finally {
        await queryRunner.release();

        if (!isSuccess) {
          throw new HttpException(
            ErrorMessage.SERVER_ERR,
            ErrorCode.SERVER_ERR,
          );
        }
        return true;
      }
    }

    await this.dataSource
      .createQueryBuilder()
      .update(Files)
      .set({
        originalName: file.filename,
        path: '/public/profile/' + encodeURIComponent(file.filename),
        size: file.size,
        updatedAt: new Date(),
      })
      .where('id=:id', { id: img.id })
      .execute();

    return true;
  }
}
