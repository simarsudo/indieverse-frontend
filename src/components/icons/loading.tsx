type Props = {
  className?: string;
  size?: "small" | "medium" | "large";
};

function Loading({ className, size }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size === "small" ? 16 : size === "large" ? 32 : 24}
      height={size === "small" ? 16 : size === "large" ? 32 : 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`loading-icon ${className}`}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export { Loading };
