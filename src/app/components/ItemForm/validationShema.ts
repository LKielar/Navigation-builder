import Yup from "@/config/yup";

export const ItemFormValidationSchema = Yup.object().shape({
  label: Yup.string().trim().required(),
  url: Yup.string().trim().optional(),
});
