import { FolderOpen } from "lucide-react";

export default function EmptyKnowledgeBase() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center text-center">
      <div className="rounded-full bg-slate-100 p-4">
        <FolderOpen className="text-slate-400" size={28} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-700">
        No sources added yet
      </h3>

      <p className="mt-2 max-w-[220px] text-xs text-slate-500">
        Upload your first PDF to start building your knowledge base.
      </p>
    </div>
  );
}