"use client";

import { FormContainer, TextFieldElement } from "react-hook-form-mui";

function CreateEquipmentPage() {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] back">
      <div className="p-4 flex flex-col justify-center items-center ">
        <FormContainer
          defaultValues={{ name: "" }}
          onSuccess={(data) => console.log(data)}
        >
          <TextFieldElement name="name" label="Name" required />
        </FormContainer>
      </div>
    </div>
  );
}

export default CreateEquipmentPage;
