from fastapi import FastAPI

from models import EmbedRequest, EmbedResponse
from services.embedding_service import embedding_service

app = FastAPI(
    title="Embedding Service",
    version="1.0.0"
)


@app.get("/")
def health():
    return embedding_service.health()


@app.post("/embed", response_model=EmbedResponse)
def embed(request: EmbedRequest):

    embeddings = embedding_service.generate_embeddings(
        request.texts
    )

    return EmbedResponse(
        embeddings=embeddings
    )