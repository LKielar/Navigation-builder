import { ErrorMessage } from "@hookform/error-message";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

type TextFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  startIcon?: React.ReactNode;
  className?: string;
  errors?: FieldErrors<FieldValues>;
};

const TextField = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  startIcon,
  className = "",
  errors,
}: TextFieldProps<T>) => {
  const isError = errors && Object.keys(errors).some((val) => val === name);

  return (
    <div className={`flex flex-col gap-[6px] ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-text-secondary">
        {label}
      </label>

      <div className="relative flex items-center">
        {startIcon && <div className="absolute left-3">{startIcon}</div>}

        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <input
                id={field.name}
                placeholder={placeholder}
                className={`border border-border-primary rounded-lg shadow-sm w-full py-2 px-3 placeholder:text-text-placeholder ${
                  isError ? "border-red-500" : ""
                } ${startIcon && "pl-10"}`}
                {...field}
              />
            );
          }}
        />
      </div>

      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <span className="text-sm text-red-500">{message}</span>
          )}
        />
      )}
    </div>
  );
};

export default TextField;
