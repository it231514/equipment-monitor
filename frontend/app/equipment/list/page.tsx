"use client";
import { useEffect, useState } from "react";
import { EquipmentList } from "../equipment.interface";
import ItemService from "../item.service";
import "../styles.css";
import Table from "./table";

export default function CreateEquipmentPage() {
  const [equipmentList, setEquipmentList] = useState([] as EquipmentList);

  useEffect(() => {
    ItemService.getEquipmentList().then((data) => setEquipmentList(data));
  }, [equipmentList]);

  return (
    <div className="w-full min-h-[calc(100vh-64px)] back">
      <div className="p-4 flex flex-col justify-center items-center ">
        <Table tableData={equipmentList} setTableData={setEquipmentList} />
      </div>
    </div>
  );
}
