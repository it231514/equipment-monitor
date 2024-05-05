"use client";
import { useState } from "react";
import { EquipmentList } from "../equipment.interface";
import "./styles.css";
import Table from "./table";

export default function CreateEquipmentPage() {
  const [equipmentList, setEquipmentList] = useState(getEquipmentList());

  function getEquipmentList() {
    return [
      {
        id: 1,
        serial: "H6444",
        desc: "Stapler",
        loc: "Versandlager",
      },
      {
        id: 2,
        serial: "H9876",
        desc: "Schweißgerät",
        loc: "Werkstatt",
      },
      {
        id: 3,
        serial: "H342",
        desc: "Laptop",
        loc: "Büro",
      },
      {
        id: 4,
        serial: "H4356",
        desc: "Putzmaschine",
        loc: "Reinigungskammer",
      },
    ] as EquipmentList;
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] back">
      <div className="p-4 flex flex-col justify-center items-center ">
        <div className="w-full text-left mb-4 text-4xl">Equipment</div>

        <Table tableData={equipmentList} />
      </div>
    </div>
  );
}
