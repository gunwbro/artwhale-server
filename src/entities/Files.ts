import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumArts } from './AlbumArts';
import { Musics } from './Musics';
import { Users } from './Users';

@Entity('files', { schema: 'artwhale' })
export class Files {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'original_name', nullable: true, length: 255 })
  originalName: string | null;

  @Column('enum', {
    name: 'file_type',
    nullable: true,
    enum: ['music', 'album_art'],
  })
  fileType: 'music' | 'album_art' | null;

  @Column('int', { name: 'size', nullable: true })
  size: number | null;

  @Column('varchar', { name: 'path', nullable: true, length: 255 })
  path: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => AlbumArts, (albumArts) => albumArts.file)
  albumArts: AlbumArts[];

  @OneToMany(() => Musics, (musics) => musics.file)
  musics: Musics[];

  @OneToMany(() => Users, (users) => users.file)
  users: Users[];
}
