import { useState } from "react";

function RetrievedChunksSection({ chunks }) {
    const [open, setOpen] = useState(false);

    if (!chunks || chunks.length === 0) return null;

    return (
        <div>
            <button onClick={() => setOpen(!open)}>
                {open ? "Hide Retrieved Chunks" : "Show Retrieved Chunks"}
            </button>

            {open && (
                <div>
                    {chunks.map((chunk, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ccc",
                                marginTop: "12px",
                                padding: "12px",
                            }}
                        >
                            <p>
                                <strong>{chunk.document}</strong>
                            </p>

                            <p>Chunk: {chunk.chunk}</p>

                            <p>Similarity: {chunk.score}</p>

                            <hr />

                            <p>{chunk.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RetrievedChunksSection;