export default function Stats({ documents }) {
  const totalChunks = documents.reduce(
    (sum, doc) => sum + doc.chunkCount,
    0
  );

  return (
    <div className="border-t border-slate-200 p-4">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Statistics
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Documents</span>
          <span className="font-medium">{documents.length}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Chunks</span>
          <span className="font-medium">{totalChunks}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Embedding</span>
          <span className="font-medium text-xs">
            all-MiniLM-L6-v2
          </span>
        </div>
      </div>
    </div>
  );
}