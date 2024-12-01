import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

const baseStyles = `flex items-center gap-[6px] font-semibold text-sm py-[10px] px-4 border border-solid rounded-md whitespace-nowrap transition w-fit`;

const variants = {
  primary:
    "text-button-primary-fg bg-button-primary-bg border-button-primary-border shadow-sm hover:bg-opacity-90",
  secondary:
    "text-button-secondary-fg bg-button-secondary-bg border-button-secondary-border shadow-sm hover:bg-bg-secondary",
  textPrimary:
    "text-button-secondary-color-fg bg-button-secondary-bg border-button-primary-border shadow-sm hover:bg-bg-secondary",
  icon: "bg-none border-none p-[10px] rounded-md h-fit",
};

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "primary" | "secondary" | "textPrimary" | "icon";
  icon?: React.ReactNode;
  additionalClasses?: string;
};

const Button = ({
  children,
  icon,
  additionalClasses = "",
  variant = "secondary",
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${additionalClasses} ${
        rest.disabled ? "opacity-50 pointer-events-none" : ""
      }`}
      {...rest}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
