export default interface Equipment {
  id: number;
  desc: string;
  loc: string;
}

export type EquipmentListElement = Pick<Equipment, "id" | "desc" | "loc">;
export type EquipmentList = EquipmentListElement[];
