import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  Id: string;
  @Column()
  SigfoxSensorId: string;
  @Column()
  Project: string;
  @Column()
  Branch: string;
  @Column()
  Hall: string;
  @Column()
  SensorTypeId: string;
}
