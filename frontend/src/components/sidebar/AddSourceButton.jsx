import { Plus } from "lucide-react";

export default function AddSourceButton({onClick}) {
  return (
    <button
      onClick={onClick}
      className="
        flex w-full items-center justify-center gap-2
        rounded-xl border-2 border-dashed border-slate-300
        bg-slate-50
        px-4 py-5
        text-slate-600
        transition-all
        hover:border-blue-500
        hover:bg-blue-50
        hover:text-blue-600
      "
    >
      <Plus size={20} />

      <span className="font-medium">
        Add Sources
      </span>
    </button>
  );
}