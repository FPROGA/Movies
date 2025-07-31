import { FC, HTMLAttributes } from "react";

import "./Button.css";
import { Loader } from "../Loader";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const BlackButton: FC<IButtonProps> = ({
  isLoading,
  isDisabled = isLoading,
  children,
  className,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      className="black-button"
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};
