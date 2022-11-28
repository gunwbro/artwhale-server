import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumArts } from './AlbumArts';
import { Files } from './Files';
import { Musics } from './Musics';
import { UsersAlbumArtsLikes } from './UsersAlbumArtsLikes';
import { UsersMusicsLikes } from './UsersMusicsLikes';

@Entity('users', { schema: 'artwhale' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nickname', nullable: true, length: 255 })
  nickname: string | null;

  @Column('text', { name: 'email' })
  email: string;

  @OneToOne(() => Files, (files) => files.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'file_id', referencedColumnName: 'id' }])
  fileId: number;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => AlbumArts, (albumArts) => albumArts.userId)
  albumArts: AlbumArts[];

  @OneToMany(
    () => UsersAlbumArtsLikes,
    (usersAlbumArtsLikes) => usersAlbumArtsLikes.userId,
  )
  usersAlbumArtsLikes: UsersAlbumArtsLikes[];

  @OneToMany(() => Musics, (musics) => musics.userId)
  musics: Musics[];

  @OneToMany(
    () => UsersMusicsLikes,
    (usersMusicsLikes) => usersMusicsLikes.userId,
  )
  usersMusicsLikes: UsersMusicsLikes[];
}
