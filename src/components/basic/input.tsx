import React, { useRef, useState } from "react";
import "./input.css";

type FileInputProps = {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onChange?: (
    file: File | null,
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => void;
  value: File | null;
  className?: string;
  accept?: string;
};

function FileInput({
  value,
  disabled,
  onChange,
  className = "",
  accept,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    const file =
      e.dataTransfer.files && e.dataTransfer.files[0]
        ? e.dataTransfer.files[0]
        : null;
    onChange?.(file, e);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className={`file-input-wrapper${
        dragActive ? " drag-active" : ""
      } ${className}`}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
      }}
      onDrop={handleDrop}
    >
      <label
        className={`file-input-label${value ? " has-file" : ""}${
          disabled ? " disabled" : ""
        }`}
      >
        <span>
          {dragActive
            ? "Drop file here"
            : value
            ? "Selected File"
            : "Select file or drag here"}
        </span>
        <input
          ref={inputRef}
          className="file-input"
          disabled={disabled}
          type="file"
          accept={accept}
          onChange={(e) => {
            const file =
              e.target.files && e.target.files[0] ? e.target.files[0] : null;
            onChange?.(file, e);
            // Optionally reset input value so the same file can be selected again
            e.currentTarget.value = "";
          }}
        />
        {value && <span className="file-input-filename">{value.name}</span>}
      </label>
    </div>
  );
}

export { FileInput };
