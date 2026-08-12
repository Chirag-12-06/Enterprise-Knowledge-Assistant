# from sentence_transformers import SentenceTransformer


# class EmbeddingService:
#     def __init__(self):
#         print("Loading embedding model...")

#         self.model = SentenceTransformer("all-MiniLM-L6-v2")

#         print("Embedding model loaded.")

#     def health(self):
#         return {
#             "status": "running"
#         }

#     def generate_embeddings(self, texts: list[str]):
#         embeddings = self.model.encode(
#             texts,
#             convert_to_numpy=True
#         )

#         return embeddings.tolist()


# embedding_service = EmbeddingService()


from sentence_transformers import SentenceTransformer


class EmbeddingService:
    def __init__(self):
        print("1. STARTING EMBEDDING SERVICE", flush=True)

        print("2. LOADING MODEL", flush=True)
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

        print("3. MODEL LOADED", flush=True)

    def health(self):
        return {"status": "running"}

    def generate_embeddings(self, texts: list[str]):
        embeddings = self.model.encode(
            texts,
            convert_to_numpy=True
        )

        return embeddings.tolist()


print("0. IMPORTING EMBEDDING SERVICE", flush=True)

embedding_service = EmbeddingService()

print("4. EMBEDDING SERVICE READY", flush=True)