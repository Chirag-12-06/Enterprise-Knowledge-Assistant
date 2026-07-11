import { SendHorizontal, Loader2 } from "lucide-react";
import{useRef} from "react";

const ChatInput = ({ input, setInput, onSend, loading }) => {
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!loading && input.trim()) {
        onSend();
      }
    }
  };

  const handleChange = (e) => {
  setInput(e.target.value);
  resizeTextarea();
};

  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
        <textarea
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask anything about your documents..."
          className="w-full resize-none overflow-y-auto max-h-84 px-5 py-3 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
          disabled={loading}
        />

        <button
          onClick={onSend}
          disabled={loading || !input.trim()}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizontal className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
