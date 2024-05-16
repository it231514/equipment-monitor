import {
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Image as ImageIcon,
  WorkHistory as WorkHistoryIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { Root, createRoot } from "react-dom/client";
import { useForm } from "react-hook-form-mui";
import { DateFnsProvider } from "react-hook-form-mui/date-fns";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import Equipment, { EquipmentList } from "../equipment.interface";
import ItemService from "../item.service";

interface SetInspectionDateDialogProps {
  row: Equipment | null;
}

export function SetInspectionDateDialog({ row }: SetInspectionDateDialogProps) {
  const [open, setOpen] = React.useState(true);

  const { control, handleSubmit } = useForm<{
    lastInspectionDate: Date;
    nextInspectionDate: Date;
  }>({
    defaultValues: {
      lastInspectionDate: new Date(),
      nextInspectionDate: new Date(),
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

          console.log(row);
          console.log(control._formValues);

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
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

interface DeleteDialogProps {
  row: Equipment | null;
  onConfirm: () => void;
}

export function DeleteItemDialog({ row, onConfirm }: DeleteDialogProps) {
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

interface Props {
  tableData: EquipmentList;
  setTableData: Dispatch<SetStateAction<EquipmentList>>;
}

export default function EquipmentTable({ tableData, setTableData }: Props) {
  const [root, setRoot] = React.useState<Root | null>(null);

  const router = useRouter();

  const handleClickOpen = (row: Equipment) => {
    let dialogRoot =
      root ||
      createRoot(
        document.getElementById("SetInspectionDateDialog") as HTMLElement
      );

    if (root === null) setRoot(dialogRoot);

    dialogRoot.render(
      <SetInspectionDateDialog key={row.id + "_setDate"} row={row} />
    );
  };

  const handleClickOpenDeleteDialog = (row: Equipment, tableIndex: number) => {
    let dialogRoot =
      root ||
      createRoot(
        document.getElementById("SetInspectionDateDialog") as HTMLElement
      );

    if (root === null) setRoot(dialogRoot);

    dialogRoot.render(
      <DeleteItemDialog
        key={row.id + "_delete"}
        row={row}
        onConfirm={() => {
          ItemService.deleteEquipment(row.id).then((success) => {
            // TODO DO SOMETHING
            console.log("Equipment Deleted " + success, row.id);
            tableData.splice(tableIndex, 1);
            setTableData(tableData);
            //alert("This should let you delete the equipment");
          });
        }}
      />
    );
  };

  const columns: MRT_ColumnDef<Equipment>[] = [
    {
      accessorKey: "id",
      header: "Pos",
    },
    {
      accessorKey: "serialNr",
      header: "Serial",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: tableData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: false,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: false,
    enableFacetedValues: false,
    enableRowActions: true,
    positionActionsColumn: "last",
    enableRowSelection: false,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      density: "compact",
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
      columnVisibility: {},
    },
    muiPaginationProps: {
      rowsPerPageOptions: [1, 10, 25, 50, 100],
      shape: "rounded",
      variant: "outlined",
      className: "[&_.Mui-selected]:bg-[#fbdc00]",
    },
    mrtTheme: (theme) => ({}),
    muiDetailPanelProps(props) {
      return {
        sx: {
          padding: 0,
        },
      };
    },
    renderDetailPanel: ({ row }) => {
      return (
        <div className="flex flex-col gap-2 w-full h-full py-2 px-4 bg-[#fbde0019]">
          <div className="inline-flex flex-row">
            <div className="flex items-center justify-center w-44 mr-16 border border-gray-200">
              {(row.original.image && (
                <img
                  src={row.original.image}
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
                <li key="articleNumber">
                  <span className="w-1/5">Article Number </span>
                  <span>{row.original.articleNr}</span>
                </li>
                <li key="manufacturer">
                  <span className="w-1/5">Manufacturer </span>
                  <span>{row.original.manufacturer}</span>
                </li>
                <li key="chairperson">
                  <span className="w-1/5">Chairperson</span>
                  <span>{row.original.chairperson}</span>
                </li>
                <li key="lastInspection">
                  <span className="w-1/5">Last Inspection</span>
                  <span>{row.original.lastInspection?.toDateString()}</span>
                </li>
                <li key="nextInspection">
                  <span className="w-1/5">Next Inspection</span>
                  <span> {row.original.nextInspection?.toDateString()}</span>
                </li>
              </ul>
            </div>
          </div>

          {row.original.sensors?.length > 0 && (
            <div className="inline-flex flex-col">
              <span className="w-full bg-gray-200 flex mb-2 rounded-sm p-1 font-semibold">
                Sensors
              </span>
              <ul className="grid w-full gap-2 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
                {row.original.sensors?.map((sensor, index) => (
                  <li
                    key={"sensor-" + index}
                    className="inline-flex flex-col bg-transparent "
                  >
                    <span className="bg-slate-100 p-2">
                      SR: {sensor.serialNr} (Type: {sensor.type})
                    </span>
                    <ul className="inline-flex flex-col w-full [&>li]:border [&>li]:border-gray-100 [&>li]:bg-white [&>li]:rounded-sm [&>li]:p-1 [&>li]:inline-flex">
                      <li key="mileage">
                        <span className="w-1/2">Mileage:</span>
                        <span>{sensor.mileage} km</span>
                      </li>
                      <li key="hours">
                        <span className="w-1/2">Operating Hours: </span>
                        <span>{sensor.operatingHours} h</span>
                      </li>
                      <li key="type">
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
      );
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        <IconButton
          color="primary"
          onClick={() => {
            //table.setEditingRow(row);
            //redirect(`/equipment/${row.getValue("id")}`);
            router.push(`/equipment/${row.getValue("id")}`);
          }}
        >
          <EditIcon className="fill-[#564c00]" />
        </IconButton>{" "}
        <IconButton
          color="primary"
          onClick={() => handleClickOpen(row.original)}
        >
          <WorkHistoryIcon className="fill-[#00348d]" />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            handleClickOpenDeleteDialog(row.original, row.index);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
    renderTopToolbar: ({ table }) => {
      return (
        <div className="flex flex-row px-2 py-4 justify-between mb-4 bg-[#fbdc00]">
          <div>
            <Tooltip title="Add Equipment" placement="bottom">
              <IconButton
                onClick={() => {
                  router.push(`/equipment/create`);
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className="flex flex-row">
            <MRT_GlobalFilterTextField table={table} />
          </div>
          <div className="flex flex-row">
            <MRT_ToggleFiltersButton table={table} />
            <MRT_ShowHideColumnsButton table={table} />
            <MRT_ToggleDensePaddingButton table={table} />
            <MRT_ToggleFullScreenButton table={table} />
          </div>
        </div>
      );
    },
  });

  return (
    <Box className="w-full">
      <MaterialReactTable table={table} />
      <div id="SetInspectionDateDialog"></div>
    </Box>
  );
}
