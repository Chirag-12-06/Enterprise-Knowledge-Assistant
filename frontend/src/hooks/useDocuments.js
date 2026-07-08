import { useState, useEffect } from "react";
import { uploadDocument, getDocuments, deleteDocument } from "../services/documentService";

export default function useDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refreshDocuments() {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } finally {
      setLoading(false);
    }
  }

  async function uploadAndRefresh(file) {
    try {
      await uploadDocument(file);
      await refreshDocuments();
    } catch (err) {
      console.error(err);
    }
  }

  async function removeDocument(id) {
  await deleteDocument(id);
  await refreshDocuments();
}

  useEffect(() => {
    refreshDocuments();
  }, []);

  return {
    documents,
    loading,
    uploadAndRefresh,
    removeDocument,
  };
}
