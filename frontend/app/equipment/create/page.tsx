"use client";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import { DateFnsProvider } from "react-hook-form-mui/date-fns";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import { NewEquipment, Sensor } from "../equipment.interface";
import ItemService from "../item.service";

function CreateEquipmentPage() {
  const { control, handleSubmit } = useForm<{
    articleNr: string;
    serialNr: string;
    manufacturer: string;
    chairperson: string;
    location: string;
    locationPrecision: string;
    lastInspectionDate: Date;
    image: string;
    description: string;
    nextInspectionDate: Date;
    sensors: string[];
  }>({
    defaultValues: {
      articleNr: "",
      serialNr: "",
      manufacturer: "",
      chairperson: "",
      location: "",
      locationPrecision: "",
      image: "",
      description: "",
      sensors: [],
    },
  });

  const [sensors, setSensors] = useState<Sensor[] | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    ItemService.getSensorList().then((data) => {
      setSensors(data);
    });
  }, [, sensors]);

  function submit() {
    const newEquipment: NewEquipment = {
      articleNr: control._formValues.articleNr,
      serialNr: control._formValues.serialNr,
      manufacturer: control._formValues.manufacturer,
      chairperson: control._formValues.chairperson,
      location: control._formValues.location,
      locationPrecise: control._formValues.locationPrecision,
      image: control._formValues.image,
      description: control._formValues.description,
      lastInspection: control._formValues.lastInspectionDate,
      nextInspection: control._formValues.nextInspectionDate,
      sensors: control._formValues.sensors,
    };

    ItemService.addEquipment(newEquipment).then((success) => {
      console.log("Equipment Added " + success, newEquipment);

      router.push(`/equipment/list`);
    });
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] back">
      <div className="w-full h-full p-4 flex flex-row">
        <div className="bg-white w-full h-full rounded-md overflow-hidden inline-flex flex-col flex-nowrap justify-center items-center">
          <DateFnsProvider>
            <div className="bg-[#fbdc00] shadow-md text-slate-700 font-bold text-lg w-full h-12 p-1 mb-2 flex justify-center items-center">
              Assign Equipment
            </div>
            <form
              onSubmit={handleSubmit(() => submit())}
              noValidate
              className="p-4 flex flex-col gap-2 w-full h-full text-black"
            >
              <Stack spacing={2}>
                <TextFieldElement
                  name={"articleNr"}
                  label={"Article Number"}
                  control={control}
                  required
                  fullWidth
                />
                <TextFieldElement
                  name={"serialNr"}
                  label={"Serial Number"}
                  control={control}
                  required
                  fullWidth
                />
                <TextFieldElement
                  name={"description"}
                  label={"Description"}
                  control={control}
                  required
                  fullWidth
                />
                <TextFieldElement
                  name={"manufacturer"}
                  label={"Manufacturer"}
                  control={control}
                  required
                  fullWidth
                />
                <TextFieldElement
                  name={"chairperson"}
                  label={"Chairperson"}
                  control={control}
                  required
                  fullWidth
                />
                <TextFieldElement
                  name={"location"}
                  label={"Location"}
                  control={control}
                  required
                  fullWidth
                />
                <TextFieldElement
                  name={"locationPrecision"}
                  label={"Precise Location"}
                  control={control}
                  fullWidth
                />
                <DatePickerElement
                  label={"Last Inspection Date"}
                  name={"lastInspectionDate"}
                  control={control}
                />
                <DatePickerElement
                  label={"Next Inspection Date"}
                  name={"nextInspectionDate"}
                  control={control}
                />

                <Autocomplete
                  className="w-full"
                  disablePortal
                  multiple
                  id="combo-box-demo"
                  options={sensors?.map((sensor) => sensor.id) || []}
                  getOptionLabel={(option) => option}
                  sx={{ width: 300 }}
                  onChange={(event, value) => {
                    control._formValues.sensors = value;
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Add Sensor" />
                  )}
                />
                <br />
                <Button
                  type={"submit"}
                  variant="contained"
                  classes={{
                    root: "hover:bg-[#fbdc00] hover:text-black text-white bg-slate-700 h-12",
                  }}
                >
                  Create
                </Button>
              </Stack>
            </form>
          </DateFnsProvider>
        </div>
      </div>
    </div>
  );
}

export default CreateEquipmentPage;
