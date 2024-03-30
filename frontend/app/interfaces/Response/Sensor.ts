export interface Sensor {
  Id: string;
  SigfoxSensorId: string;
  Project: string;
  Branch: string;
  Hall: string;
  SensorTypeId: string;
}

export interface SensorType {
  Id: string;
  TypeName: string;
}

export interface Message {
  Id: string;
  RawData: string;
  Timestamp: string;
  SequenceNr: number;
  Project: string;
  SensorId: string;
}

export interface MessageValue {
  Id: string;
  Tag: string;
  Value: string;
  Unit: string;
  MessageId: string;
}
