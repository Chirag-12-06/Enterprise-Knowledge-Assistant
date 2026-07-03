const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema(
    {
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
            required: true,
        },

        chunkIndex: {
            type: Number,
            required: true,
        },

        text: {
            type: String,
            required: true,
        },

        embedding: {
            type: [Number],
            default: [],
        },

        metadata: {
            page: {
                type: Number,
                default: null,
            },
        },
    },
    {
        timestamps: true,
    }
);

chunkSchema.index({ documentId: 1 });
chunkSchema.index({ chunkIndex: 1 });

module.exports = mongoose.model("Chunk", chunkSchema);