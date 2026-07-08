function SourcesSection({ sources }) {
    if (!sources || sources.length === 0) return null;

    return (
        <div>
            <h2>Sources</h2>

            {sources.map((source, index) => (
                <div key={index}>
                    <p>
                        <strong>{source.document}</strong>
                    </p>

                    <p>Chunk: {source.chunk}</p>

                    <p>Similarity: {source.score}</p>
                </div>
            ))}
        </div>
    );
}

export default SourcesSection;