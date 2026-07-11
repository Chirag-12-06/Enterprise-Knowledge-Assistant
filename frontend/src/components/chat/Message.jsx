import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ThinkingBubble from "../animations/ThinkingBubble";
import { Copy, Check } from "lucide-react";

const Message = ({ message }) => {
  const [showChunks, setShowChunks] = useState(false);
  const isUser = message.role === "user";
  const uniqueDocuments = [
    ...new Set(message.sources?.map((s) => s.document) || []),
  ];
  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm animate-message ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-200 bg-white text-slate-800"
        }`}
      >
        {message.loading ? (
          <ThinkingBubble />
        ) : message.role === "assistant" ? (
          <>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          </>
        ) : (
          <p>{message.content}</p>
        )}
        {message.role === "assistant" &&
          message.sources &&
          message.sources.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setShowChunks((prev) => !prev)}
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                📄 Sources ({uniqueDocuments.length})
              </button>

              <button
                onClick={copyMessage}
                className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          )}
        {showChunks && message.retrievedChunks?.length > 0 && (
          <div className="animate-expand mt-4 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            {message.retrievedChunks.map((chunk, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      📄 {chunk.document}
                    </h4>

                    <p className="mt-1 text-xs text-slate-500">
                      Chunk #{chunk.chunk}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Similarity
                    </p>

                    <span className="font-semibold text-blue-600">
                      {Math.round(chunk.score * 100)}%
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-slate-50 p-3">
                  <p className="text-sm leading-6 text-slate-700">
                    {chunk.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
