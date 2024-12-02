import React from "react";
import { useForm } from "react-hook-form";
import BaseItemForm from "./BaseItemForm";
import { ItemFormValues } from "@/types/itemFormValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemFormValidationSchema } from "./validationShema";

type Props = {
  onFormSubmit: (values: ItemFormValues) => void;
  onClose: () => void;
};

const initialValues: ItemFormValues = {
  label: "",
  url: "",
};

const AddItemForm = ({ onFormSubmit, onClose }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ItemFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(ItemFormValidationSchema),
  });

  return (
    <BaseItemForm
      defaultValues={initialValues}
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onFormSubmit)}
      onClose={onClose}
      onDelete={onClose}
    />
  );
};

export default AddItemForm;
