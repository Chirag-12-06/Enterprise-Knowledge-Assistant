import { BrainCircuit, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import AddSourceButton from "../components/sidebar/AddSourceButton";
import ChatList from "../components/sidebar/Chat/ChatList";
import DocumentList from "../components/sidebar/Document/DocumentList";
import FileUpload from "../components/sidebar/FileUpload";
import Stats from "../components/sidebar/Stats";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import useDocuments from "../hooks/useDocuments";

export default function Sidebar({
  open,
  onToggle,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  conversationToDelete,
  onDeleteConversation,
  setConversationToDelete,
}) {
  const {
    documents,
    loading,
    uploadAndRefresh,
    removeDocument,
    deleteDoc,
    setDeleteDoc,
    uploading,
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
          disabled={uploading}
            onFileSelect={uploadAndRefresh}
          >
            <AddSourceButton
              uploading={uploading}
            />
          </FileUpload>
          <div className="mt-8 space-y-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Knowledge Base
            </h2>
            <div className="space-y-3">
              <DocumentList documents={documents} onDelete={setDeleteDoc} />
            </div>
            <div className="space-y-4">
              <button
                onClick={() => {
                  console.log("New Chat clicked");
                  onNewChat();
                }}
                className="
        flex w-full items-center justify-center gap-2
        rounded-xl border-2 border-dashed border-slate-300
        bg-slate-50
        px-4 py-3
        text-slate-600
        transition-all
        hover:border-blue-500
        hover:bg-blue-50
        hover:text-blue-600
      "
              >
                New Chat
              </button>

              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Conversations
                </h2>

                <ChatList
                  conversations={conversations}
                  activeConversationId={activeConversationId}
                  onSelectConversation={onSelectConversation}
                  onDelete={(conversation) => {
                    setConversationToDelete(conversation);
                  }}
                />
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <Stats documents={documents} />
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteDoc}
        title="Delete document?"
        itemLabel="Document"
        itemName={deleteDoc?.title}
        consequences={["Document", "All text chunks", "Generated embeddings"]}
        onCancel={() => setDeleteDoc(null)}
        onConfirm={async () => {
          await removeDocument(deleteDoc._id);
          setDeleteDoc(null);
        }}
      />
      <ConfirmDialog
        open={!!conversationToDelete}
        title="Delete conversation?"
        itemLabel="Conversation"
        itemName={conversationToDelete?.title}
        consequences={["Conversation", "All messages"]}
        onCancel={() => setConversationToDelete(null)}
        onConfirm={async () => {
          await onDeleteConversation(conversationToDelete._id);
          setConversationToDelete(null);
        }}
      />
    </aside>
  );
}
