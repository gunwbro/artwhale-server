import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumArts } from './AlbumArts';
import { Musics } from './Musics';
import { UsersAlbumArtsLikes } from './UsersAlbumArtsLikes';
import { UsersMusicsLikes } from './UsersMusicsLikes';

@Entity('users', { schema: 'artwhale' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nickname', nullable: true, length: 255 })
  nickname: string | null;

  @Column('varchar', { name: 'oauth2_id', nullable: true, length: 255 })
  oauth2Id: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => AlbumArts, (albumArts) => albumArts.user)
  albumArts: AlbumArts[];

  @OneToMany(
    () => UsersAlbumArtsLikes,
    (usersAlbumArtsLikes) => usersAlbumArtsLikes.user,
  )
  usersAlbumArtsLikes: UsersAlbumArtsLikes[];

  @OneToMany(() => Musics, (musics) => musics.user)
  musics: Musics[];

  @OneToMany(
    () => UsersMusicsLikes,
    (usersMusicsLikes) => usersMusicsLikes.user,
  )
  usersMusicsLikes: UsersMusicsLikes[];
}
