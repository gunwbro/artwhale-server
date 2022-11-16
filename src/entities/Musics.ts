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
import { AlbumArts } from './AlbumArts';
import { UsersMusicsLikes } from './UsersMusicsLikes';

@Index('user_id', ['userId'], {})
@Index('file_id', ['fileId'], {})
@Index('album_art_id', ['albumArtId'], {})
@Entity('musics', { schema: 'artwhale' })
export class Musics {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('text', { name: 'lyrics', nullable: true })
  lyrics: string | null;

  @Column('varchar', { name: 'mood', nullable: true, length: 255 })
  mood: string | null;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @Column('int', { name: 'file_id', nullable: true })
  fileId: number | null;

  @Column('int', { name: 'album_art_id', nullable: true })
  albumArtId: number | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.musics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Files, (files) => files.musics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'file_id', referencedColumnName: 'id' }])
  file: Files;

  @ManyToOne(() => AlbumArts, (albumArts) => albumArts.musics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'album_art_id', referencedColumnName: 'id' }])
  albumArt: AlbumArts;

  @OneToMany(
    () => UsersMusicsLikes,
    (usersMusicsLikes) => usersMusicsLikes.music,
  )
  usersMusicsLikes: UsersMusicsLikes[];
}
