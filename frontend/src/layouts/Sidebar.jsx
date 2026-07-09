import { BrainCircuit, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import AddSourceButton from "../components/sidebar/AddSourceButton";
import DocumentList from "../components/sidebar/DocumentList";
import Stats from "../components/sidebar/Stats";
import FileUpload from "../components/sidebar/FileUpload";
import useDocuments from "../hooks/useDocuments";
import ConfirmDialog from "../components/ui/ConfirmDialog";

export default function Sidebar({ open, onToggle }) {
  const {
    documents,
    loading,
    uploadAndRefresh,
    removeDocument,
    deleteDoc,
    setDeleteDoc,
  } = useDocuments();
  return (
    <aside
      className={`border-r border-slate-200 bg-white transition-all duration-300 ${
        open ? "w-80" : "w-16"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-3">
        {/* Logo */}
        <button
          onClick={!open ? onToggle : undefined}
          className="group relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100"
        >
          {/* Brain */}
          <BrainCircuit
            size={22}
            className={`absolute transition-all duration-200 ${
              open ? "opacity-100" : "group-hover:opacity-0"
            }`}
          />

          {/* Open */}
          {!open && (
            <PanelLeftOpen
              size={22}
              className="absolute opacity-0 transition-all duration-200 group-hover:opacity-100"
            />
          )}
        </button>

        {/* Close Button */}
        {open && (
          <button
            onClick={onToggle}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <PanelLeftClose size={20} />
          </button>
        )}
      </div>

      {open && (
        <div className="border-t border-slate-200 p-6">
          <FileUpload
            onFileSelect={async (file) => {
              uploadAndRefresh(file);
            }}
          >
            <AddSourceButton />
          </FileUpload>
          <div className="mt-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Knowledge Base
            </h2>
            <div className="space-y-3">
              <DocumentList documents={documents} onDelete={setDeleteDoc} />
            </div>
            <div className="pt-6">
              <Stats documents={documents} />
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteDoc}
        title="Delete document?"
        documentName={deleteDoc?.title}
        onCancel={() => setDeleteDoc(null)}
        onConfirm={async () => {
          await removeDocument(deleteDoc._id);
          setDeleteDoc(null);
        }}
      />
    </aside>
  );
}
