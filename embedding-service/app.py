# from fastapi import FastAPI

# from models import EmbedRequest, EmbedResponse
# from services.embedding_service import embedding_service

# app = FastAPI(
#     title="Embedding Service",
#     version="1.0.0"
# )


# @app.get("/")
# def health():
#     return embedding_service.health()


# @app.post("/embed", response_model=EmbedResponse)
# def embed(request: EmbedRequest):
#     embeddings = embedding_service.generate_embeddings(
#         request.texts
#     )

#     return EmbedResponse(
#         embeddings=embeddings
#     )


from fastapi import FastAPI

print("STEP 1: app.py started", flush=True)

try:
    from models import EmbedRequest, EmbedResponse
    print("STEP 2: models imported", flush=True)
except Exception as e:
    print(f"MODELS ERROR: {e}", flush=True)
    raise

try:
    from services.embedding_service import embedding_service
    print("STEP 3: embedding service imported", flush=True)
except Exception as e:
    print(f"EMBEDDING SERVICE ERROR: {e}", flush=True)
    raise


app = FastAPI(
    title="Embedding Service",
    version="1.0.0"
)


@app.get("/")
def health():
    print("HEALTH CHECK", flush=True)
    return embedding_service.health()


@app.post("/embed", response_model=EmbedResponse)
def embed(request: EmbedRequest):
    embeddings = embedding_service.generate_embeddings(
        request.texts
    )

    return EmbedResponse(
        embeddings=embeddings
    )