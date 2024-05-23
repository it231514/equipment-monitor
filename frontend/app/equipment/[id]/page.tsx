"use client";
import { Delete as DeleteIcon, Image as ImageIcon } from "@mui/icons-material";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateFnsProvider } from "react-hook-form-mui/date-fns";
import Equipment, { Sensor } from "../equipment.interface";
import ItemService from "../item.service";

export default function EquipmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | undefined>(undefined);
  const [sensors, setSensors] = useState<Sensor[] | undefined>(undefined);

  useEffect(() => {
    ItemService.getEqipment(params.id).then((data) => setEquipment(data));
  }, []);

  useEffect(() => {
    ItemService.getSensorList().then((data) => {
      setSensors(data);
    });
  }, [equipment]);

  const getSensorById = (sensorId: string) => {
    return sensors?.find((sensor) => sensor.id === sensorId);
  };

  return (
    <div
      key="equipment-details"
      className="w-full min-h-[calc(100vh-64px)] back"
    >
      <div className="p-4 flex flex-col gap-2 w-full h-full text-black text-left">
        <div className="inline-flex flex-row">
          <div className="flex items-center justify-center w-56 mr-10 p-3 border-2 rounded-md overflow-hidden border-slate-600">
            {(equipment?.image && (
              <img
                src={equipment?.image}
                alt="Element Image"
                className="h-auto w-full"
              />
            )) || (
              <div className="flex flex-col justify-center items-center w-full h-full text-slate-400">
                <ImageIcon />
                No Image
              </div>
            )}
          </div>
          <div className="w-full">
            <ul className="flex flex-col w-full [&>li]:border-2 [&>li]:border-slate-600  [&>li]:bg-white [&>li]:rounded-sm [&>li]:my-[0.05rem] [&>li]:p-1 [&>li]:inline-flex">
              <li key={equipment?.id}>
                <span className="w-1/5 min-w-36 font-bold">Pos</span>
                <span className="w-4/5">{equipment?.id}</span>
              </li>
              <li key={equipment?.description} className="flex items-center">
                <span className="w-1/5 min-w-36 font-bold">Description</span>
                <span className="w-4/5">
                  <TextField
                    id="description"
                    variant="standard"
                    required
                    defaultValue={equipment?.description}
                    fullWidth
                    onChange={(event) => {
                      if (equipment)
                        ItemService.updateEquipment(equipment.id, {
                          description: event.target.value,
                        });
                    }}
                  />
                </span>
              </li>
              <li key={equipment?.location} className="flex items-center">
                <span className="w-1/5 min-w-36 font-bold">Location</span>
                <span className="w-4/5">
                  <TextField
                    id="location"
                    variant="standard"
                    required
                    defaultValue={equipment?.location}
                    fullWidth
                    onChange={(event) => {
                      if (equipment)
                        ItemService.updateEquipment(equipment.id, {
                          location: event.target.value,
                        });
                    }}
                  />
                </span>
              </li>
              <li
                key={equipment?.locationPrecise}
                className="flex items-center"
              >
                <span className="w-1/5 min-w-36 font-bold">
                  Precise Location
                </span>
                <span className="w-4/5">
                  <TextField
                    id="locationPrecise"
                    variant="standard"
                    required
                    defaultValue={equipment?.locationPrecise}
                    fullWidth
                    onChange={(event) => {
                      if (equipment)
                        ItemService.updateEquipment(equipment.id, {
                          locationPrecise: event.target.value,
                        });
                    }}
                  />
                </span>
              </li>
              <li key={equipment?.serialNr} className="flex items-center">
                <span className="w-1/5 min-w-36 font-bold">Serial Number</span>
                <span className="w-4/5">
                  <TextField
                    id="serialNr"
                    variant="standard"
                    required
                    defaultValue={equipment?.serialNr}
                    fullWidth
                    onChange={(event) => {
                      if (equipment)
                        ItemService.updateEquipment(equipment.id, {
                          serialNr: event.target.value,
                        });
                    }}
                  />
                </span>
              </li>
              <li key={equipment?.articleNr} className="flex items-center">
                <span className="w-1/5 min-w-36 font-bold">Article Number</span>
                <span className="w-4/5">
                  <TextField
                    id="articleNr"
                    variant="standard"
                    required
                    defaultValue={equipment?.articleNr}
                    fullWidth
                    onChange={(event) => {
                      if (equipment)
                        ItemService.updateEquipment(equipment.id, {
                          articleNr: event.target.value,
                        });
                    }}
                  />
                </span>
              </li>
              <li key={equipment?.manufacturer} className="flex items-center">
                <span className="w-1/5 min-w-36 font-bold">Manufacturer</span>
                <span className="w-4/5">
                  <TextField
                    id="manufacturer"
                    variant="standard"
                    required
                    defaultValue={equipment?.manufacturer}
                    fullWidth
                    onChange={(event) => {
                      if (equipment)
                        ItemService.updateEquipment(equipment.id, {
                          manufacturer: event.target.value,
                        });
                    }}
                  />
                </span>
              </li>
              <li key={equipment?.chairperson} className="flex items-center">
                <span className="w-1/5 min-w-36 font-bold">Chairperson</span>
                <span className="w-4/5">
                  <TextField
                    id="chairperson"
                    variant="standard"
                    required
                    defaultValue={equipment?.chairperson}
                    fullWidth
                    onChange={(event) => {
                      if (equipment)
                        ItemService.updateEquipment(equipment.id, {
                          chairperson: event.target.value,
                        });
                    }}
                  />
                </span>
              </li>
              <li key="lastInspection" className="flex items-center">
                <span className="w-1/5 min-w-36 font-bold">
                  Last Inspection
                </span>
                <span className="w-4/5">
                  <DateFnsProvider>
                    <DatePicker
                      className="w-full"
                      autoFocus
                      // TODO SET DEFAULT VALUE ???
                      // defaultValue={equipment?.lastInspection}
                      onChange={(newValue) => {
                        if (equipment)
                          ItemService.updateEquipment(equipment.id, {
                            lastInspection: newValue,
                          });
                      }}
                    />
                  </DateFnsProvider>
                </span>
              </li>
              <li key="nextInspection" className="flex items-center">
                <span className="w-1/5 min-w-36 font-bold">
                  Next Inspection
                </span>
                <span className="w-4/5">
                  <DateFnsProvider>
                    <DatePicker
                      className="w-full"
                      defaultValue={equipment?.nextInspection as null}
                      onChange={(newValue) => {
                        if (equipment)
                          ItemService.updateEquipment(equipment.id, {
                            nextInspection: newValue,
                          });
                      }}
                    />
                  </DateFnsProvider>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {true && (
          <div className="inline-flex flex-col">
            <span className="w-full bg-gray-200 flex justify-between items-center mb-2 rounded-md p-1 font-semibold border-2 overflow-hidden border-slate-600">
              <span className="bg-transparent">Sensors</span>

              <div className="flex gap-x-3">
                <Autocomplete
                  className="scale-y-90"
                  disablePortal
                  id="combo-box-demo"
                  options={sensors?.map((sensor) => sensor.id) || []}
                  sx={{ width: 300 }}
                  onChange={(event, value) => {
                    if (equipment && value)
                      ItemService.updateEquipment(equipment.id, {
                        sensors: [...equipment.sensors, value],
                      }).then((data) =>
                        setEquipment({
                          ...equipment,
                          sensors: [...equipment.sensors, value],
                        })
                      );
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Add Sensor" />
                  )}
                />
              </div>
            </span>
            <ul className="grid w-full gap-2 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
              {equipment?.sensors?.map((sensor, index) => (
                <li
                  key={"sensor-" + index}
                  className="inline-flex flex-col bg-transparent "
                >
                  <div className="flex border-2 rounded-md overflow-hidden border-slate-600">
                    <div className="w-full flex flex-col">
                      <span className="font-medium bg-slate-200 p-2">
                        SR: {getSensorById(sensor)?.serialNr} (Type:
                        {getSensorById(sensor)?.type})
                      </span>
                      <ul className="inline-flex flex-col w-full [&>li]:border [&>li]:border-gray-100 [&>li]:bg-white [&>li]:p-1 [&>li]:inline-flex">
                        <li key={getSensorById(sensor)?.mileage}>
                          <span className="w-1/2">Mileage:</span>
                          <span>{getSensorById(sensor)?.mileage} km</span>
                        </li>
                        <li key={getSensorById(sensor)?.operatingHours}>
                          <span className="w-1/2">Operating Hours: </span>
                          <span>{getSensorById(sensor)?.operatingHours} h</span>
                        </li>
                        <li key={getSensorById(sensor)?.type}>
                          <span className="w-1/2">Current Value:</span>
                          <span>
                            {getSensorById(sensor)?.type === "temperature"
                              ? getSensorById(sensor)?.value + " °C"
                              : getSensorById(sensor)?.value}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <IconButton
                      className="w-10 text-black hover:text-white bg-[#fbdc00]  hover:bg-red-600 rounded-none"
                      onClick={() => {
                        ItemService.updateEquipment(equipment.id, {
                          sensors: equipment.sensors?.filter(
                            (s) => s !== sensor
                          ),
                        }).then((data) =>
                          setEquipment({
                            ...equipment,
                            sensors: equipment.sensors?.filter(
                              (s) => s !== sensor
                            ),
                          })
                        );
                      }}
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
