import { AlertTriangle, FileText } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  itemLabel,
  itemName,
  consequences = [],
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        {/* Warning Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="text-red-600" size={28} />
        </div>

        {/* Title */}
        <h2 className="mt-5 text-center text-xl font-semibold text-slate-800">
          {title}
        </h2>

        {/* Document Card */}
        {itemName && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <FileText className="text-blue-600" size={18} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {itemLabel}
              </p>

              <p className="font-medium text-slate-800">
                {itemName}
              </p>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mt-5 rounded-lg bg-red-50 p-4">
          <p className="text-sm text-slate-700">
            This action will permanently remove:
          </p>

          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
  {consequences.map((item) => (
    <li key={item}>{item}</li>
  ))}
</ul>

          <p className="mt-4 text-sm font-medium text-red-600">
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2 font-medium transition hover:bg-slate-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}