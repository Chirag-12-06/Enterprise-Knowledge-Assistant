# # from sentence_transformers import SentenceTransformer


# # class EmbeddingService:
# #     def __init__(self):
# #         print("Loading embedding model...")

# #         self.model = SentenceTransformer("all-MiniLM-L6-v2")

# #         print("Embedding model loaded.")

# #     def health(self):
# #         return {
# #             "status": "running"
# #         }

# #     def generate_embeddings(self, texts: list[str]):
# #         embeddings = self.model.encode(
# #             texts,
# #             convert_to_numpy=True
# #         )

# #         return embeddings.tolist()


# # embedding_service = EmbeddingService()


# print("EMBEDDING SERVICE: FILE START", flush=True)

# from sentence_transformers import SentenceTransformer

# print("EMBEDDING SERVICE: SENTENCE TRANSFORMERS IMPORTED", flush=True)


# class EmbeddingService:
#     def __init__(self):
#         print("EMBEDDING SERVICE: INIT", flush=True)
#         self.model = None

#     def load_model(self):
#         if self.model is None:
#             print("EMBEDDING SERVICE: LOADING MODEL", flush=True)

#             self.model = SentenceTransformer(
#                 "all-MiniLM-L6-v2"
#             )

#             print("EMBEDDING SERVICE: MODEL LOADED", flush=True)

#     def health(self):
#         return {
#             "status": "running"
#         }

#     def generate_embeddings(self, texts: list[str]):
#         self.load_model()

#         embeddings = self.model.encode(
#             texts,
#             convert_to_numpy=True
#         )

#         return embeddings.tolist()


# print("EMBEDDING SERVICE: CREATING INSTANCE", flush=True)

# embedding_service = EmbeddingService()

# print("EMBEDDING SERVICE: READY", flush=True)


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