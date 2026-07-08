import { useRef } from "react";

export default function FileUpload({ children, onFileSelect }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onFileSelect(file);

    // Allow selecting the same file again
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
      />

      <div onClick={handleClick}>
        {children}
      </div>
    </>
  );
}