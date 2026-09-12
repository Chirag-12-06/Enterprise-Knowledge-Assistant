
import sys


print("EMBEDDING SERVICE: FILE START", flush=True)

print("PYTHON:", sys.version, flush=True)

import torch

print("TORCH IMPORTED", flush=True)
print("TORCH VERSION:", torch.__version__, flush=True)

import transformers

print("TRANSFORMERS IMPORTED", flush=True)
print("TRANSFORMERS VERSION:", transformers.__version__, flush=True)

import sentence_transformers

print("SENTENCE TRANSFORMERS IMPORTED", flush=True)
print(
    "SENTENCE TRANSFORMERS VERSION:",
    sentence_transformers.__version__,
    flush=True
)


class EmbeddingService:
    def __init__(self):
        print("EMBEDDING SERVICE: INIT", flush=True)
        self.tokenizer = None
        self.model = None

    def load_model(self):
        if self.model is None:
            print("LOADING MODEL", flush=True)

            self.tokenizer = AutoTokenizer.from_pretrained(
                "sentence-transformers/all-MiniLM-L6-v2"
            )

            self.model = AutoModel.from_pretrained(
                "sentence-transformers/all-MiniLM-L6-v2"
            )

            print("MODEL LOADED", flush=True)

    def health(self):
        return {"status": "running"}


embedding_service = EmbeddingService()

print("EMBEDDING SERVICE: READY", flush=True)