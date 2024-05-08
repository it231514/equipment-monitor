import { Delete as DeleteIcon } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
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
import { EquipmentList, EquipmentListElement } from "../equipment.interface";

interface Props {
  tableData: EquipmentList;
}

export default function EquipmentTable({ tableData }: Props) {
  const router = useRouter();

  const columns: MRT_ColumnDef<EquipmentListElement>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 80,
    },
    {
      accessorKey: "serial",
      header: "Serial",
      size: 100,
    },
    {
      accessorKey: "desc",
      header: "Description",
      size: 200,
    },
    {
      accessorKey: "loc",
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
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [1, 10, 25, 50, 100],
      shape: "rounded",
      variant: "outlined",
    },
    mrtTheme: (theme) => ({}),
    renderDetailPanel: ({ row }) => <Box>DETAILS</Box>,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        <IconButton
          color="primary"
          onClick={() => {
            //table.setEditingRow(row);
            console.log(row.getValue("id"));
            //redirect(`/equipment/${row.getValue("id")}`);
            router.push(`/equipment/${row.getValue("id")}`);
          }}
        >
          <InfoIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            row.toggleExpanded();
            tableData.splice(row.index, 1); //assuming simple data table
            // TODO call delete API
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
