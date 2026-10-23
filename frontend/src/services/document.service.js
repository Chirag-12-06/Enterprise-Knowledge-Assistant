import api from "./api";

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/documents", formData);

    return response.data;
  } catch (error) {
    if (error.response?.status === 409) {
      return error.response.data;
    }

    throw error;
  }
}

export async function getDocuments() {
  const response = await api.get("/documents");
  return response.data;
}

export async function deleteDocument(id) {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
}
