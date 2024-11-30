import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type TextFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  startIcon?: React.ReactNode;
  className?: string;
  errors?: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
};

const TextField = ({
  label,
  name,
  placeholder,
  startIcon,
  className = "",
  errors,
  register,
}: TextFieldProps) => {
  const isError = errors && Object.keys(errors).some((val) => val === name);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-text-secondary">
        {label}
      </label>

      <div className="relative flex items-center">
        {startIcon && <div className="absolute left-3">{startIcon}</div>}

        <input
          {...register(name)}
          id={name}
          placeholder={placeholder}
          className={`pl-${
            startIcon ? "10" : "3"
          } border border-border-primary rounded-lg shadow-sm w-full py-2 px-3 ${
            isError ? "border-red-500" : ""
          }`}
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
