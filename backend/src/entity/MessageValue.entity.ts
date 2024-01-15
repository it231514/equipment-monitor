import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'MessageValue' })
export class MessageValue {
  @PrimaryGeneratedColumn()
  Id: string;
  @Column()
  Tag: string;
  @Column()
  Value: string;
  @Column()
  Unit: string;
  @Column()
  MessageId: string;
}
