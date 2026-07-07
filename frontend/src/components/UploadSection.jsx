import { useState } from "react";
import api from "../services/api";

function UploadSection({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);

            await api.post("/upload", formData);

            alert("Upload Successful");

            onUploadSuccess();
        } catch (err) {
            console.error(err);
            alert("Upload Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
}

export default UploadSection;