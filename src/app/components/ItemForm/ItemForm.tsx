import React from "react";
import { useForm } from "react-hook-form";
import TrashIcon from "@/assets/TrashIcon.svg";
import MagnifierIcon from "@/assets/MagnifierIcon.svg";
import TextField from "../../../components/TextField/TextField";
import Button from "@/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemFormValidationSchema } from "./validationShema";
import { ItemFormValues } from "@/types/itemFormValues";

const initialValues = {
  label: "",
  url: "",
};

type Props = {
  onFormSubmit: (values: ItemFormValues) => void;
  onClose: () => void;
};

const ItemForm = ({ onFormSubmit, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(ItemFormValidationSchema),
  });

  const onSubmit = (data: ItemFormValues) => {
    onFormSubmit(data);
  };

  return (
    <div className="p-6 bg-bg-secondary">
      <div className="flex gap-4 w-full px-[24px] py-[20px] bg-bg-primary border border-solid border-border-primary rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          <div className="flex flex-col gap-2">
            <TextField
              name="label"
              label="Nazwa"
              placeholder="np. Promocje"
              control={control}
              errors={errors}
            />

            <TextField
              label="Link"
              name="url"
              placeholder="Wklej lub wyszukaj"
              startIcon={<MagnifierIcon />}
              control={control}
              errors={errors}
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" onClick={onClose}>
              Anuluj
            </Button>

            <Button variant="textPrimary">Zapisz</Button>
          </div>
        </form>

        <button className=" bg-button-secondary-bg p-[10px] rounded-md self-start">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default ItemForm;
