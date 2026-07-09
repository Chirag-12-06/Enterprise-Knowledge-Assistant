import DocumentCard from "./DocumentCard";
import EmptyKnowledgeBase from "./EmptyKnowledgeBase";

export default function DocumentList({ documents, onDelete }) {
  if (documents.length === 0) {
    return <EmptyKnowledgeBase />;
  }
  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          title={doc.title}
          chunks={doc.chunkCount}
          status={doc.status}
          onDelete={() => onDelete(doc)}
        />
      ))}
    </div>
  );
}
