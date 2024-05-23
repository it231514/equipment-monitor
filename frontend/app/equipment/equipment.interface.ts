export default interface Equipment {
  id: number | string;
  serialNr: string;
  articleNr: string;
  description: string;
  location: string;
  locationPrecise: string;
  image: string | null;
  manufacturer: string;
  chairperson: string;
  lastInspection: Date | null;
  nextInspection: Date | null;
  sensors: string[]; // => SensorId[]
}

// export a new type where manufacturer and chairperson are set to optional
export type NewEquipment = Omit<Equipment, "id">;
export type UpdateEquipment = Partial<Omit<Equipment, "id">>;
export type UpdateSensor = Partial<Omit<Sensor, "id">>;
export type EquipmentEssentials = Pick<
  Equipment,
  "id" | "serialNr" | "description" | "location"
>;
export type EquipmentEssentialsList = EquipmentEssentials[];
export type EquipmentList = Equipment[];
export type EquipmentOptList = HasKeys<Equipment>[];

export type SensorList = Sensor[];
export interface Sensor {
  id: string;
  type: string;
  value: number;
  serialNr: string;
  operatingHours: number;
  mileage: number;
}

export type HasKeys<T> = {
  [P in keyof T]: any;
};
