import { useRef } from "react";

export default function FileUpload({
  children,
  onFileSelect,
  disabled = false,
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onFileSelect(file);

    e.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={handleChange}
        disabled={disabled}
      />

      <div onClick={handleClick}>{children}</div>
    </>
  );
}
