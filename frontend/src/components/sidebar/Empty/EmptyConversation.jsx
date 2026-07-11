import { MessageSquareText } from "lucide-react";

export default function EmptyChats({ hasDocuments }) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center text-center">
      <div className="rounded-full bg-slate-100 p-4">
        <MessageSquareText className="text-slate-400" size={28} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-700">
        No conversations yet
      </h3>

      <p className="mt-2 max-w-55 text-xs leading-5 text-slate-500">
        {hasDocuments
          ? "Start a new chat to ask questions about your knowledge base."
          : "Upload a document first, then start your first conversation."}
      </p>
    </div>
  );
}