import "./button.css";
import { Loading } from "../icons/loading";

type Props = {
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit";
  isLoading: boolean;
};

function Button({
  disabled,
  onClick,
  className = "",
  children = "Button",
  type = "button",
  isLoading = false,
}: Props) {
  return (
    <button
      className={`btn ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {isLoading ? (
        <>
          {children} <Loading size="small" />
        </>
      ) : (
        children
      )}
    </button>
  );
}

export { Button };
