import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  Id: string;
  @Column()
  RawData: string;
  @Column()
  Timestamp: Date;
  @Column()
  SequenceNr: number;
  @Column()
  Project: string;
  @Column()
  SensorId: string;
}
