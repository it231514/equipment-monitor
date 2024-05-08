"use client";
import { useState } from "react";
import { EquipmentOptList, SensorList } from "../equipment.interface";
import "./styles.css";
import Table from "./table";
import TestImageBase64 from "./testimage";

export default function CreateEquipmentPage() {
  const [equipmentList, setEquipmentList] = useState(getEquipmentList());

  function getEquipmentList() {
    return [
      {
        id: 1,
        image: TestImageBase64,
        serialNr: "H6444",
        articleNr: "5674373423",
        manufacturer: "Some Random Chinese Dude",
        description: "Stapler",
        location: "Versandlager",
        chairperson: "Mr. Mustermann Max",
        lastInspection: new Date(),
        nextInspection: new Date(),
        sensors: [
          {
            id: "fgjj9e",
            type: "temperature",
            serialNr: "45786947896",
            operatingHours: 3453,
            mileage: 5675,
            temperature: 23.5,
          },
          {
            id: "fgjjsds9e",
            type: "temperature",
            serialNr: "45786947896",
            operatingHours: 3453,
            mileage: 5675,
            temperature: 26.5,
          },
          {
            id: "fgjj9e",
            type: "temperature",
            serialNr: "45786947896",
            operatingHours: 3453,
            mileage: 5675,
            temperature: 23.5,
          },
          {
            id: "fgjjsds9e",
            type: "temperature",
            serialNr: "45786947896",
            operatingHours: 3453,
            mileage: 5675,
            temperature: 26.5,
          },
          {
            id: "fgjj9e",
            type: "temperature",
            serialNr: "45786947896",
            operatingHours: 3453,
            mileage: 5675,
            temperature: 23.5,
          },
          {
            id: "fgjjsds9e",
            type: "temperature",
            serialNr: "45786947896",
            operatingHours: 3453,
            mileage: 5675,
            temperature: 26.5,
          },
        ] as SensorList,
      },
      {
        id: 2,
        serialNr: "H9876",
        description: "Schweißgerät",
        location: "Werkstatt",
      },
      {
        id: 3,
        serialNr: "H342",
        description: "Laptop",
        location: "Büro",
      },
      {
        id: 4,
        serialNr: "H4356",
        description: "Putzmaschine",
        location: "Reinigungskammer",
      },
      {
        id: 1,
        image: TestImageBase64,
        serialNr: "H6444",
        articleNr: "5674373423",
        manufacturer: "Some Random Chinese Dude",
        description: "Stapler",
        location: "Versandlager",
        chairperson: "Mr. Mustermann Max",
        lastInspection: new Date(),
        nextInspection: new Date(),
        sensors: [
          {
            id: "fgjj9e",
            type: "temperature",
            serialNr: "45786947896",
            operatingHours: 3453,
            mileage: 5675,
            temperature: 23.5,
          },
        ] as SensorList,
      },
      {
        id: 2,
        serialNr: "H9876",
        description: "Schweißgerät",
        location: "Werkstatt",
      },
      {
        id: 3,
        serialNr: "H342",
        description: "Laptop",
        location: "Büro",
      },
      {
        id: 4,
        serialNr: "H4356",
        description: "Putzmaschine",
        location: "Reinigungskammer",
      },
      {
        id: 1,
        serialNr: "H6444",
        description: "Stapler",
        location: "Versandlager",
      },
      {
        id: 2,
        serialNr: "H9876",
        description: "Schweißgerät",
        location: "Werkstatt",
      },
      {
        id: 3,
        serialNr: "H342",
        description: "Laptop",
        location: "Büro",
      },
      {
        id: 4,
        serialNr: "H4356",
        description: "Putzmaschine",
        location: "Reinigungskammer",
      },
      {
        id: 1,
        serialNr: "H6444",
        description: "Stapler",
        location: "Versandlager",
      },
      {
        id: 2,
        serialNr: "H9876",
        description: "Schweißgerät",
        location: "Werkstatt",
      },
      {
        id: 3,
        serialNr: "H342",
        description: "Laptop",
        location: "Büro",
      },
      {
        id: 4,
        serialNr: "H4356",
        description: "Putzmaschine",
        location: "Reinigungskammer",
      },
    ] as EquipmentOptList;
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] back">
      <div className="p-4 flex flex-col justify-center items-center ">
        <Table tableData={equipmentList} />
      </div>
    </div>
  );
}
