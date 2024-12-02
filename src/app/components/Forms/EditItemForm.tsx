import React from "react";
import { useForm } from "react-hook-form";
import { ItemFormValues } from "@/types/itemFormValues";
import BaseItemForm from "./BaseItemForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemFormValidationSchema } from "./validationShema";

type Props = {
  initialValues: ItemFormValues;
  onFormSubmit: (values: ItemFormValues) => void;
  onClose: () => void;
  onDelete: () => void;
};

const EditItemForm = ({
  initialValues,
  onFormSubmit,
  onClose,
  onDelete,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
      onDelete={onDelete}
      isEditForm
    />
  );
};

export default EditItemForm;
