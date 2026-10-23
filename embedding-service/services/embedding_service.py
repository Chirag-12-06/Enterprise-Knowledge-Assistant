import sys
import torch
from transformers import AutoTokenizer, AutoModel

print("EMBEDDING SERVICE: FILE START", flush=True)
print("PYTHON:", sys.version, flush=True)
print("TORCH VERSION:", torch.__version__, flush=True)


class EmbeddingService:
    def __init__(self):
        print("EMBEDDING SERVICE: INIT", flush=True)
        self.tokenizer = None
        self.model = None

    def load_model(self):
        if self.model is None:
            print("LOADING MODEL", flush=True)

            model_name = "sentence-transformers/all-MiniLM-L6-v2"

            self.tokenizer = AutoTokenizer.from_pretrained(model_name)
            self.model = AutoModel.from_pretrained(model_name)

            self.model.eval()

            print("MODEL LOADED", flush=True)

    def generate_embeddings(self, texts):
        if not texts:
            return []

        self.load_model()

        encoded_input = self.tokenizer(
            texts,
            padding=True,
            truncation=True,
            max_length=256,
            return_tensors="pt",
        )

        with torch.no_grad():
            model_output = self.model(**encoded_input)

        # Mean pooling over token embeddings, excluding padding tokens.
        token_embeddings = model_output.last_hidden_state
        attention_mask = encoded_input["attention_mask"]

        mask = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()

        summed_embeddings = torch.sum(token_embeddings * mask, dim=1)
        token_counts = torch.clamp(mask.sum(dim=1), min=1e-9)

        embeddings = summed_embeddings / token_counts

        # Normalize vectors for semantic similarity.
        embeddings = torch.nn.functional.normalize(embeddings, p=2, dim=1)

        return embeddings.cpu().tolist()

    def health(self):
        return {"status": "running"}


embedding_service = EmbeddingService()

print("EMBEDDING SERVICE: READY", flush=True)