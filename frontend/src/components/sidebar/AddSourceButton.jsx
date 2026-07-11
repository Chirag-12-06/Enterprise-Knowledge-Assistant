import { Loader2, Plus } from "lucide-react";

export default function AddSourceButton({
  onClick,
  uploading,
}) {
  return (
    <>
      <button
        onClick={onClick}
        disabled={uploading}
        className={`
          flex w-full items-center justify-center gap-2
          rounded-xl border-2 border-dashed
          px-4 py-5
          transition-all
          ${
            uploading
              ? "cursor-not-allowed border-slate-300 bg-slate-100 text-slate-500 opacity-80"
              : "border-slate-300 bg-slate-50 text-slate-600 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
          }
        `}
      >
        {uploading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span className="font-medium">Processing...</span>
          </>
        ) : (
          <>
            <Plus size={20} />
            <span className="font-medium">Add Sources</span>
          </>
        )}
      </button>

      {uploading && (
        <p className="mt-3 text-center text-sm text-slate-500">
          Processing document...
          <br />
          This may take up to a minute for large PDFs.
        </p>
      )}
    </>
  );
}