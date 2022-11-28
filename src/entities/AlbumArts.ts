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

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.albumArts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId: number;

  @OneToOne(() => Files, (files) => files.albumArt, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'file_id', referencedColumnName: 'id' }])
  fileId: number;

  @OneToMany(
    () => UsersAlbumArtsLikes,
    (usersAlbumArtsLikes) => usersAlbumArtsLikes.albumArtId,
  )
  usersAlbumArtsLikes: UsersAlbumArtsLikes[];

  @OneToMany(() => Musics, (musics) => musics.albumArtId)
  musics: Musics[];
}
