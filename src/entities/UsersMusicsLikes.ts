import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { Musics } from './Musics';

@Index('user_id', ['userId'], {})
@Index('music_id', ['musicId'], {})
@Entity('users_musics_like', { schema: 'artwhale' })
export class UsersMusicsLikes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.usersMusicsLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId: number;

  @ManyToOne(() => Musics, (musics) => musics.usersMusicsLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'music_id', referencedColumnName: 'id' }])
  musicId: number;
}
