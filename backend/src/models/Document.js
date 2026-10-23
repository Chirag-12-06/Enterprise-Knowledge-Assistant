const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    // SHA-256 hash of the uploaded PDF's contents
    fileHash: {
      type: String,
      required: true,
    },

    knowledgeBaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KnowledgeBase",
      default: null,
    },

    uploadedBy: {
      type: String,
      default: "system",
    },

    chunkCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent identical PDFs from being stored more than once.
documentSchema.index({ fileHash: 1 }, { unique: true });

module.exports = mongoose.model("Document", documentSchema);