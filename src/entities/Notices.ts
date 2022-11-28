import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Files } from './Files';

@Entity('notices', { schema: 'artwhale' })
export class Notices {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'title', nullable: true })
  title: string | null;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @OneToOne(() => Files, (files) => files.notice, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'file_id', referencedColumnName: 'id' }])
  fileId: number;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
