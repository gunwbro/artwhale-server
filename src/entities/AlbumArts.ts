import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { Files } from './Files';
import { UsersAlbumArtsLikes } from './UsersAlbumArtsLikes';
import { Musics } from './Musics';

@Index('user_id', ['userId'], {})
@Index('file_id', ['fileId'], {})
@Entity('album_arts', { schema: 'artwhale' })
export class AlbumArts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('varchar', { name: 'method', nullable: true, length: 255 })
  method: string | null;

  @Column('varchar', { name: 'mood', nullable: true, length: 255 })
  mood: string | null;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @Column('int', { name: 'file_id', nullable: true })
  fileId: number | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.albumArts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Files, (files) => files.albumArts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'file_id', referencedColumnName: 'id' }])
  file: Files;

  @OneToMany(
    () => UsersAlbumArtsLikes,
    (usersAlbumArtsLikes) => usersAlbumArtsLikes.albumArt,
  )
  usersAlbumArtsLikes: UsersAlbumArtsLikes[];

  @OneToMany(() => Musics, (musics) => musics.albumArt)
  musics: Musics[];
}
