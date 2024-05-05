import { Box } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import { EquipmentList, EquipmentListElement } from "../equipment.interface";

interface Props {
  tableData: EquipmentList;
}

export default function EquipmentTable({ tableData }: Props) {
  //should be memoized or stable
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

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return (
    <Box className="w-full">
      <MaterialReactTable table={table} />;
    </Box>
  );
}
