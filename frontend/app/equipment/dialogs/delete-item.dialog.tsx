import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Equipment from "../equipment.interface";

interface DeleteDialogProps {
  row: Equipment | null;
  onConfirm: () => void;
}

export default function DeleteItemDialog({
  row,
  onConfirm,
}: DeleteDialogProps) {
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog open={open} onClose={() => {}}>
      <DialogTitle>Delete Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete this item?: {row?.description} (
          {row?.articleNr}
          ).
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
            onConfirm;
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="error"
          variant="outlined"
          className=""
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
