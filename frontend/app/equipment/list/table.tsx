import { Delete as DeleteIcon } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { Box, IconButton } from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { EquipmentList, EquipmentListElement } from "../equipment.interface";

interface Props {
  tableData: EquipmentList;
}

export default function EquipmentTable({ tableData }: Props) {
  const router = useRouter();

  //should be memorized or stable
  const columns = useMemo<MRT_ColumnDef<EquipmentListElement>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 10,
      },
      {
        accessorKey: "serial",
        header: "Serial",
        size: 10,
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
    ],
    []
  );

  return (
    <Box className="w-full">
      <MaterialReactTable
        columns={columns}
        data={tableData}
        layoutMode="grid"
        displayColumnDefOptions={{
          "mrt-row-actions": {
            size: 180, //if using layoutMode that is not 'semantic', the columns will not auto-size, so you need to set the size manually
            grow: false,
          },
        }}
        enableRowActions
        renderRowActions={({ row, table }) => (
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
                tableData.splice(row.index, 1); //assuming simple data table
                // TODO call delete API
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      />
    </Box>
  );
}
