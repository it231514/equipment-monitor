export default interface Equipment {
  id: number;
  serial: string;
  desc: string;
  loc: string;
}

export type EquipmentListElement = Pick<
  Equipment,
  "id" | "desc" | "loc" | "serial"
>;
export type EquipmentList = EquipmentListElement[];
