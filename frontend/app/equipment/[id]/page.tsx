"use client";
import { Image as ImageIcon } from "@mui/icons-material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Equipment from "../equipment.interface";
import ItemService from "../item.service";

export default function EquipmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | undefined>(undefined);

  useEffect(() => {
    ItemService.getEqipment(params.id).then((data) => setEquipment(data));
  }, [equipment]);

  return (
    <div className="w-full min-h-[calc(100vh-64px)] back">
      <div className="p-4 flex flex-col gap-2 w-full h-full text-black text-left">
        <div className="inline-flex flex-row">
          <div className="flex items-center justify-center w-44 mr-16 border border-gray-200">
            {(equipment?.image && (
              <img
                src={equipment?.image}
                alt="Element Image"
                className="h-auto w-full"
              />
            )) || (
              <div className="flex flex-col justify-center items-center w-full h-full">
                <ImageIcon />
                No Image
              </div>
            )}
          </div>
          <div className="w-full">
            <ul className="flex flex-col w-full [&>li]:border [&>li]:border-gray-200 [&>li]:bg-white [&>li]:rounded-sm [&>li]:my-[0.05rem] [&>li]:p-1 [&>li]:inline-flex">
              <li key={equipment?.id}>
                <span className="w-1/5 min-w-36 font-bold">Pos</span>
                <span className="w-4/5">{equipment?.id}</span>
              </li>
              <li key={equipment?.description}>
                <span className="w-1/5 min-w-36 font-bold">Description</span>
                <span className="w-4/5">{equipment?.description}</span>
              </li>
              <li key={equipment?.location}>
                <span className="w-1/5 min-w-36 font-bold">Location</span>
                <span className="w-4/5">{equipment?.location}</span>
              </li>
              <li key={equipment?.locationPrecise}>
                <span className="w-1/5 min-w-36 font-bold">
                  Precise Location
                </span>
                <span className="w-4/5">{equipment?.locationPrecise}</span>
              </li>
              <li key={equipment?.serialNr}>
                <span className="w-1/5 min-w-36 font-bold">Serial Number</span>
                <span className="w-4/5">{equipment?.serialNr}</span>
              </li>
              <li key={equipment?.articleNr}>
                <span className="w-1/5 min-w-36 font-bold">Article Number</span>
                <span className="w-4/5">{equipment?.articleNr}</span>
              </li>
              <li key={equipment?.manufacturer}>
                <span className="w-1/5 min-w-36 font-bold">Manufacturer</span>
                <span className="w-4/5">{equipment?.manufacturer}</span>
              </li>
              <li key={equipment?.chairperson}>
                <span className="w-1/5 min-w-36 font-bold">Chairperson</span>
                <span className="w-4/5">{equipment?.chairperson}</span>
              </li>
              <li key="lastInspection">
                <span className="w-1/5 min-w-36 font-bold">
                  Last Inspection
                </span>
                <span className="w-4/5">
                  {equipment?.lastInspection?.toDateString()}
                </span>
              </li>
              <li key="nextInspection">
                <span className="w-1/5 min-w-36 font-bold">
                  Next Inspection
                </span>
                <span className="w-4/5">
                  {equipment?.nextInspection?.toDateString()}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {(equipment?.sensors?.length || 0) > 0 && (
          <div className="inline-flex flex-col">
            <span className="w-full bg-gray-200 flex mb-2 rounded-sm p-1 font-semibold">
              Sensors
            </span>
            <ul className="grid w-full gap-2 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
              {equipment?.sensors?.map((sensor, index) => (
                <li
                  key={"sensor-" + index}
                  className="inline-flex flex-col bg-transparent "
                >
                  <span className="bg-slate-100 p-2">
                    SR: {sensor.serialNr} (Type: {sensor.type})
                  </span>
                  <ul className="inline-flex flex-col w-full [&>li]:border [&>li]:border-gray-100 [&>li]:bg-white [&>li]:rounded-sm [&>li]:p-1 [&>li]:inline-flex">
                    <li key={sensor.mileage}>
                      <span className="w-1/2">Mileage:</span>
                      <span>{sensor.mileage} km</span>
                    </li>
                    <li key={sensor.operatingHours}>
                      <span className="w-1/2">Operating Hours: </span>
                      <span>{sensor.operatingHours} h</span>
                    </li>
                    <li key={sensor.type}>
                      <span className="w-1/2">Current Value:</span>
                      <span>
                        {sensor.type === "temperature"
                          ? sensor.temperature + " °C"
                          : sensor.humidity}
                      </span>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
