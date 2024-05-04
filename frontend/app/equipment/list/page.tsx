"use client";
import { Typography } from "@mui/material";
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
        desc: "Stapler",
        loc: "Versandlager",
      },
      {
        id: 2,
        desc: "Schweißgerät",
        loc: "Werkstatt",
      },
      {
        id: 3,
        desc: "Laptop",
        loc: "Büro",
      },
      {
        id: 4,
        desc: "Putzmaschine",
        loc: "Reinigungskammer",
      },
    ] as EquipmentList;
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] back">
      <div className="p-4 flex flex-col justify-center items-center ">
        <Typography variant="h2" component="h1" gutterBottom>
          Equipment
        </Typography>

        <Table tableData={equipmentList} />
      </div>
    </div>
  );
}
