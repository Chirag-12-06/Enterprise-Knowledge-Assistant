import { Bot } from "lucide-react";

export default function EmptyKnowledgeBase() {
  return (
<div className="flex h-full flex-col items-center justify-center px-6 text-center">
  <Bot className="mb-6 h-16 w-16 text-blue-600" />

  <h1 className="text-3xl font-semibold text-slate-900">
    Enterprise Knowledge Assistant
  </h1>

  <p className="mt-4 max-w-xl text-slate-600">
    Ask questions about your uploaded documents.
  </p>

  <p className="mt-2 max-w-xl text-sm text-slate-500">
    Responses are generated using semantic search over your knowledge base.
  </p>
</div>
  );}