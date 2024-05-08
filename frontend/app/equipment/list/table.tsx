import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Image as ImageIcon,
  WorkHistory as WorkHistoryIcon,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
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
import Equipment, { EquipmentList } from "../equipment.interface";

interface Props {
  tableData: EquipmentList;
}

export default function EquipmentTable({ tableData }: Props) {
  const router = useRouter();

  const columns: MRT_ColumnDef<Equipment>[] = [
    {
      accessorKey: "id",
      header: "Pos",
      size: 80,
    },
    {
      accessorKey: "serialNr",
      header: "Serial",
      size: 100,
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 200,
    },
    {
      accessorKey: "location",
      header: "Location",
      size: 150,
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
      color: "secondary",
      rowsPerPageOptions: [1, 10, 25, 50, 100],
      shape: "rounded",
      variant: "outlined",
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
                <li>
                  <span className="w-1/5">Article Number </span>
                  <span>{row.original.articleNr}</span>
                </li>
                <li>
                  <span className="w-1/5">Manufacturer </span>
                  <span>{row.original.manufacturer}</span>
                </li>
                <li>
                  <span className="w-1/5">Chairperson</span>
                  <span>{row.original.chairperson}</span>
                </li>
                <li>
                  <span className="w-1/5">Last Inspection</span>
                  <span>{row.original.lastInspection?.toDateString()}</span>
                </li>
                <li>
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
                {row.original.sensors?.map((sensor) => (
                  <li className="inline-flex flex-col bg-transparent ">
                    <span className="bg-slate-100 p-2">
                      SR: {sensor.serialNr} (Type: {sensor.type})
                    </span>
                    <ul className="inline-flex flex-col w-full [&>li]:border [&>li]:border-gray-100 [&>li]:bg-white [&>li]:rounded-sm [&>li]:p-1 [&>li]:inline-flex">
                      <li>
                        <span className="w-1/2">Mileage:</span>
                        <span>{sensor.mileage} km</span>
                      </li>
                      <li>
                        <span className="w-1/2">Operating Hours: </span>
                        <span>{sensor.operatingHours} h</span>
                      </li>
                      <li>
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
          onClick={() => {
            alert("This should let you set the inspection date"); // TODO implement inspection date
          }}
        >
          <WorkHistoryIcon className="fill-[#00348d]" />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            tableData.splice(row.index, 1); //assuming simple data table
            alert("This should let you delete the equipment"); // TODO implement delete
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
    renderTopToolbar: ({ table }) => {
      return (
        <div className="flex flex-row px-2 py-4 justify-between mb-4 bg-[#fbdc00]">
          <div className="flex flex-row">
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </div>
          <div className="flex flex-row">
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
    </Box>
  );
}
