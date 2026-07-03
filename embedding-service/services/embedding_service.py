from sentence_transformers import SentenceTransformer


class EmbeddingService:
    def __init__(self):
        print("Loading embedding model...")

        self.model = SentenceTransformer("all-MiniLM-L6-v2")

        print("Embedding model loaded.")

    def health(self):
        return {
            "status": "running"
        }

    def generate_embeddings(self, texts: list[str]):
        embeddings = self.model.encode(
            texts,
            convert_to_numpy=True
        )

        return embeddings.tolist()


embedding_service = EmbeddingService()

