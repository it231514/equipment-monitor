"use client";
import { Button, Stack } from "@mui/material";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import { DateFnsProvider } from "react-hook-form-mui/date-fns";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import { NewEquipment, SensorList } from "../equipment.interface";
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
    sensors: SensorList;
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

  function submit() {
    console.log("Submitted", control._formValues);

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
      sensors: [],
    };

    ItemService.addEquipment(newEquipment).then((success) => {
      //TODO DO SOMETHING
      console.log("Equipment Added " + success, newEquipment);
    });
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] back">
      <div className="w-full h-full p-4 flex flex-row">
        <div className="bg-white w-full h-full rounded-sm inline-flex flex-col flex-nowrap justify-center items-center p-4">
          <DateFnsProvider>
            <div className="bg-[#fbdc00] text-slate-700 font-semibold rounded-sm shadow-sm w-full p-1 mb-8">
              Assign Equipment
            </div>
            <form
              onSubmit={handleSubmit(() => submit())}
              noValidate
              className="flex flex-col gap-2 w-full h-full text-black"
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
                  required
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
                <br />
                <Button
                  type={"submit"}
                  variant="contained"
                  classes={{
                    root: "bg-[#fbdc00] text-black hover:text-white hover:bg-slate-700",
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
