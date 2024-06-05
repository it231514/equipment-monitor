"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Autocomplete, Button, Stack, TextField, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import { DateFnsProvider } from "react-hook-form-mui/date-fns";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import { NewEquipment, Sensor } from "../equipment.interface";
import ItemService from "../item.service";

function CreateEquipmentPage() {
  const router = useRouter();

  const [sensors, setSensors] = useState<Sensor[] | undefined>(undefined);
  const [image, setImage] = useState<string>("");

  const { control, handleSubmit } = useForm<NewEquipment>({
    defaultValues: {
      articleNr: "",
      serialNr: "",
      manufacturer: "",
      chairperson: "",
      location: "",
      locationPrecise: "",
      image: image,
      description: "",
      sensors: [],
      nextInspection: null,
      lastInspection: null,
    },
  });

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    ItemService.getSensorList().then((data) => {
      setSensors(data);
    });
  }, [, sensors]);

  function submit() {
    control._formValues.image = image;
    const newEquipment = control._formValues as NewEquipment;

    ItemService.addEquipment(newEquipment).then((success) => {
      console.log("Equipment Added " + success, newEquipment);
      router.push(`/equipment/list`);
    });
  }

  function handleUploadClick(event: BaseSyntheticEvent) {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result?.toString() || "");
      //console.log(reader.result);
    };
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] back">
      <div className="w-full h-full p-4 flex flex-col">
        <Button
          variant="contained"
          color="error"
          className="w-full rounded-md text-left mt-2"
          onClick={() => {
            router.push(`/equipment/list`);
          }}
        >
          Abort without saving
        </Button>
        <div className="p-0 mt-4">
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
                  <div className="w-full flex justify-center items-center gap-x-3 bg-slate-100 rounded-md">
                    <img className="max-h-52 rounded-md" src={image} />
                  </div>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    classes={{
                      root: "hover:bg-[#fbdc00] hover:text-black text-white bg-slate-700 h-12",
                    }}
                  >
                    Upload Image
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleUploadClick}
                    />
                  </Button>

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
                    name={"locationPrecise"}
                    label={"Precise Location"}
                    control={control}
                    fullWidth
                  />
                  <DatePickerElement
                    label={"Last Inspection Date"}
                    name={"lastInspection"}
                    control={control}
                  />
                  <DatePickerElement
                    label={"Next Inspection Date"}
                    name={"nextInspection"}
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
    </div>
  );
}

export default CreateEquipmentPage;
