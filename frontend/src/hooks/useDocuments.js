import { useState, useEffect } from "react";
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
} from "../services/document.service";
import { toast } from "sonner";

export default function useDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDoc, setDeleteDoc] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function refreshDocuments() {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } finally {
      setLoading(false);
    }
  }

  async function uploadAndRefresh(file) {
    setUploading(true);

    try {
      const result = await uploadDocument(file);

      if (result.duplicate) {
        toast.info(
          result.message || "This document has already been uploaded.",
        );
        return;
      }

      toast.success(result.message || "Document uploaded successfully");
      await refreshDocuments();
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  }

  async function removeDocument(id) {
    await deleteDocument(id);
    toast.success("Document deleted successfully");
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
    deleteDoc,
    setDeleteDoc,
    uploading,
  };
}
