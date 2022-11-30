import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { AlbumArts } from './AlbumArts';

@Index('user_id', ['userId'], {})
@Index('album_art_id', ['albumArtId'], {})
@Entity('users_album_arts_likes', { schema: 'artwhale' })
export class UsersAlbumArtsLikes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.usersAlbumArtsLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId: number;

  @ManyToOne(() => AlbumArts, (albumArts) => albumArts.usersAlbumArtsLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'album_art_id', referencedColumnName: 'id' }])
  albumArtId: number;
}
