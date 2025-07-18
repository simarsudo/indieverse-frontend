import "./button.css";
import { Loading } from "../icons/loading";

type Props = {
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  type: "button" | "submit";
  isLoading: boolean;
};

function Button({
  size = "medium",
  disabled,
  onClick,
  className = "",
  children = "Button",
  type = "button",
  isLoading = false,
}: Props) {
  return (
    <button
      className={`btn ${size} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {isLoading ? <Loading size="small" /> : children}
    </button>
  );
}

export { Button };
