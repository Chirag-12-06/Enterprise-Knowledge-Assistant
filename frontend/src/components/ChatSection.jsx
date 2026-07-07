import { useState } from "react";
import api from "../services/api";

function ChatSection({ onAnswer }) {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const askQuestion = async () => {
        if (!question.trim()) return;

        try {
            setLoading(true);

            const response = await api.post("/chat/search", {
                question,
            });

            onAnswer(response.data);
        } catch (err) {
            console.error(err);
            alert("Failed to get answer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Ask a question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <button
                onClick={askQuestion}
                disabled={loading}
            >
                {loading ? "Thinking..." : "Ask"}
            </button>
        </div>
    );
}

export default ChatSection;