import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SensorType' })
export class SensorType {
  @PrimaryGeneratedColumn()
  Id: string;
  @Column()
  TypeName: string;
}
