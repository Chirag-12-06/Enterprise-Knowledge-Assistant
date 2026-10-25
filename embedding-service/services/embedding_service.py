import sys
import torch
from transformers import AutoTokenizer, AutoModel

torch.set_num_threads(1)
torch.set_num_interop_threads(1)

print("EMBEDDING SERVICE: FILE START", flush=True)
print("PYTHON:", sys.version, flush=True)
print("TORCH VERSION:", torch.__version__, flush=True)
print("CUDA AVAILABLE:", torch.cuda.is_available(), flush=True)


class EmbeddingService:
    def __init__(self):
        print("EMBEDDING SERVICE: INIT", flush=True)
        self.tokenizer = None
        self.model = None

    def load_model(self):
        if self.model is None:
            model_name = "sentence-transformers/paraphrase-MiniLM-L3-v2"

            print("LOADING TOKENIZER", flush=True)

            self.tokenizer = AutoTokenizer.from_pretrained(
                model_name
            )

            print("TOKENIZER LOADED", flush=True)
            print("LOADING MODEL", flush=True)

            self.model = AutoModel.from_pretrained(
                model_name,
                low_cpu_mem_usage=True,
            )

            self.model.eval()
            print("MODEL LOADED", flush=True)

    def generate_embeddings(self, texts):
        if not texts:
            return []

        self.load_model()

        all_embeddings = []
        batch_size = 4

        for i in range(0, len(texts), batch_size):
            batch_texts = texts[i:i + batch_size]

            encoded_input = self.tokenizer(
                batch_texts,
                padding=True,
                truncation=True,
                max_length=256,
                return_tensors="pt",
            )

            with torch.inference_mode():
                model_output = self.model(**encoded_input)

                token_embeddings = model_output.last_hidden_state
                attention_mask = encoded_input["attention_mask"]

                mask = attention_mask.unsqueeze(-1).to(
                    token_embeddings.dtype
                )

                summed_embeddings = (token_embeddings * mask).sum(dim=1)

                token_counts = mask.sum(dim=1).clamp(min=1e-9)

                embeddings = summed_embeddings / token_counts

                embeddings = torch.nn.functional.normalize(
                    embeddings,
                    p=2,
                    dim=1,
                )

            all_embeddings.extend(embeddings.cpu().tolist())

        return all_embeddings

    def health(self):
        return {"status": "running"}


embedding_service = EmbeddingService()

print("EMBEDDING SERVICE: READY", flush=True)