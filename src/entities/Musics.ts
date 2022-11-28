import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Column('int', { name: 'duration' })
  duration: number;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.musics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId: number;

  @OneToOne(() => Files, (files) => files.music, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'file_id', referencedColumnName: 'id' }])
  fileId: number;

  @ManyToOne(() => AlbumArts, (albumArts) => albumArts.musics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'album_art_id', referencedColumnName: 'id' }])
  albumArtId: number;

  @OneToMany(
    () => UsersMusicsLikes,
    (usersMusicsLikes) => usersMusicsLikes.musicId,
  )
  usersMusicsLikes: UsersMusicsLikes[];
}
