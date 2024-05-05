"use client";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function CreateEquipmentPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="w-full min-h-[calc(100vh-64px)] back">
      <div className="p-4 flex flex-col justify-center items-center ">
        <Typography variant="h2" component="h1" gutterBottom>
          {params.id}
        </Typography>
      </div>
    </div>
  );
}
