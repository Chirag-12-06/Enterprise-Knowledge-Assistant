import DocumentCard from "./DocumentCard";
import EmptyKnowledgeBase from "./EmptyKnowledgeBase";

export default function DocumentList({ documents }) {
  if (documents.length === 0) {
    return <EmptyKnowledgeBase />;
  }
  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} title={doc.title} chunks={doc.chunks} />
      ))}
    </div>
  );
}
