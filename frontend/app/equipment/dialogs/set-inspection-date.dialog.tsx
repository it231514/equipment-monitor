import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { DateFnsProvider } from "react-hook-form-mui/date-fns";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import Equipment from "../equipment.interface";
import ItemService from "../item.service";

interface SetInspectionDateDialogProps {
  row: Equipment | null;
}

export default function SetInspectionDateDialog({
  row,
}: SetInspectionDateDialogProps) {
  const [open, setOpen] = React.useState(true);

  const { control, handleSubmit } = useForm<{
    lastInspectionDate: Date | null;
    nextInspectionDate: Date | null;
  }>({
    defaultValues: {
      lastInspectionDate: row?.lastInspection,
      nextInspectionDate: row?.nextInspection,
    },
  });

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          if (row?.id) {
            console.log(row);
            console.log(control._formValues);

            ItemService.updateEquipment(row?.id, {
              nextInspection: control._formValues.nextInspectionDate,
              lastInspection: control._formValues.lastInspectionDate,
            });
          }

          setOpen(false);
        },
      }}
    >
      <DialogTitle>Set Inspection Date</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Set the next inspection date for {row?.description}.
        </DialogContentText>
        <div className="w-full mt-8 inline-flex flex-col gap-6">
          <DateFnsProvider>
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
          </DateFnsProvider>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="outlined" color="warning">
          Set
        </Button>
      </DialogActions>
    </Dialog>
  );
}
