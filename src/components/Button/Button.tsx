import { PropsWithChildren } from "react";

const baseStyles = `flex items-center gap-[6px] font-semibold text-sm py-[10px] px-4 border border-solid rounded-md whitespace-nowrap transition hover:bg-opacity-95 w-fit shadow-sm`;

const variants = {
  primary:
    "text-button-primary-fg bg-button-primary-bg border-button-primary-border",
  secondary:
    "text-button-secondary-fg bg-button-secondary-bg border-button-secondary-border",
  icon: "bg-none border-none p-[10px] rounded-md h-fit shadow-none",
};

type ButtonProps = {
  variant?: "primary" | "secondary" | "icon";
  onClick?: () => void;
  icon?: React.ReactNode;
  additionalClasses?: string;
  disabled?: boolean;
  ref?: (node: HTMLElement | null) => void;
};

const Button = ({
  children,
  onClick,
  icon,
  additionalClasses = "",
  disabled = false,
  variant = "secondary",
  ref,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${additionalClasses} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      ref={ref}
      {...rest}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
