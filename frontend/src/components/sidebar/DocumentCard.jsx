import { FileText, MoreHorizontal } from "lucide-react";

export default function DocumentCard({ title, chunks, status = "Indexed" }) {
  return (
    <div
      className="
        group cursor-pointer rounded-lg border border-slate-200
        bg-white p-3
        transition-all duration-200
        hover:border-blue-300
        hover:shadow-sm
      "
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center self-start rounded-lg bg-blue-100">
            <FileText size={20} className="text-blue-600" />
          </div>

          <div>
            <h3 className="font-medium text-slate-800">{title}</h3>

            <p className="mt-1 text-xs text-slate-500">{chunks} chunks</p>

            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
              {status}
            </span>
          </div>
        </div>

        <button
          className="
            rounded-lg p-1
            opacity-0
            transition-opacity
            group-hover:opacity-100
            hover:bg-slate-100
          "
        >
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
