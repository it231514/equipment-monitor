export default interface Equipment {
  id: number;
  serialNr: string;
  articleNr: string;
  description: string;
  location: string;
  image: string;
  manufacturer: string;
  chairperson: string;
  lastInspection: Date;
  nextInspection: Date;
  sensors: SensorList;
}

export type EquipmentEssentials = Pick<
  Equipment,
  "id" | "serialNr" | "description" | "location"
>;
export type EquipmentEssentialsList = EquipmentEssentials[];
export type EquipmentList = Equipment[];
export type EquipmentOptList = HasKeys<Equipment>[];

export type Sensor = TemperatureSensor | HumiditySensor;
export type SensorList = Sensor[];
export interface BaseSensor {
  id: string;
  type: string;
  serialNr: string;
  operatingHours: number;
  mileage: number;
}
export interface TemperatureSensor extends BaseSensor {
  type: "temperature";
  temperature: number;
}
export interface HumiditySensor extends BaseSensor {
  type: "humidity";
  humidity: number;
}

export type HasKeys<T> = {
  [P in keyof T]: any;
};
