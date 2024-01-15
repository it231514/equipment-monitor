// import { ApiProperty } from "@nestjs/swagger";
// import { IsNotEmpty } from "class-validator";

export interface Message {
  Id: string;
  RawData: string;
  Timestamp: Date;
  SequenceNr: number;
  Project: string;
  SensorId: string;
}
