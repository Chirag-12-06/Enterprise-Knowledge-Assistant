# RAG Chat Application

A Retrieval-Augmented Generation (RAG) application that allows users to upload documents, process their content into vector embeddings, and interact with them through a context-aware conversational interface.

The system combines **MongoDB Atlas Vector Search**, **Sentence Transformers**, **FastAPI**, **Node.js**, and **React** to provide document-based semantic search and persistent conversations.

## Features

* **Document Upload & Processing**

  * Upload PDF documents through the application.
  * Extract and split document content into manageable chunks.
  * Generate semantic embeddings using Sentence Transformers.
  * Store document chunks and embeddings in MongoDB.

* **Semantic Vector Search**

  * Uses MongoDB Atlas Vector Search to retrieve the most relevant document chunks.
  * Performs semantic retrieval rather than relying only on keyword matching.
  * Provides relevant context to the conversational layer.

* **Context-Aware RAG Chat**

  * Ask questions about uploaded documents.
  * Retrieves relevant context before generating responses.
  * Supports conversations that retain previous messages.
  * Enables follow-up questions using conversation history.

* **Persistent Conversations**

  * Conversations and messages are stored in MongoDB.
  * Previous conversations can be loaded after refreshing the application.
  * Messages remain available across sessions.
  * Conversations can be deleted when no longer required.

* **Document Management**

  * View uploaded documents.
  * Track document-related information.
  * Delete documents and their associated data.

* **Production-Ready UI States**

  * Loading skeletons and spinners.
  * Empty states.
  * Error toasts.
  * Confirmation dialogs for destructive actions.
  * Responsive chat interface.

## Architecture

```text
                    ┌─────────────────────┐
                    │     React Client    │
                    │                     │
                    │  Chat / Documents   │
                    │  Conversations      │
                    └──────────┬──────────┘
                               │
                               │ HTTP API
                               ▼
                    ┌─────────────────────┐
                    │   Node.js Backend   │
                    │      Express        │
                    │                     │
                    │ Chat / Documents    │
                    │ Conversations       │
                    │ Messages            │
                    └───────┬─────┬───────┘
                            │     │
                 Vector     │     │ Persistence
                 Search     │     │
                            ▼     ▼
                  ┌─────────────┐ ┌─────────────┐
                  │  MongoDB    │ │  MongoDB    │
                  │ Atlas       │ │ Collections │
                  │             │ │             │
                  │ Vector      │ │ Documents   │
                  │ Search      │ │ Messages    │
                  │ Index       │ │ Conversations│
                  └──────┬──────┘ └─────────────┘
                         ▲
                         │
                         │ Embeddings
                         │
                  ┌──────┴──────┐
                  │  FastAPI    │
                  │ Embedding   │
                  │  Service    │
                  │             │
                  │ Sentence    │
                  │ Transformers│
                  └─────────────┘
```

## RAG Pipeline

The application follows a standard Retrieval-Augmented Generation pipeline:

```text
PDF Upload
    ↓
Text Extraction
    ↓
Text Chunking
    ↓
Embedding Generation
    ↓
MongoDB Storage
    ↓
MongoDB Atlas Vector Search
    ↓
Relevant Context Retrieval
    ↓
Conversation Context
    ↓
LLM Response
```

### 1. Document Ingestion

When a document is uploaded, its content is extracted and divided into smaller chunks.

Each chunk is processed independently so that relevant sections can later be retrieved efficiently.

### 2. Embedding Generation

The application uses the `all-MiniLM-L6-v2` Sentence Transformer model to convert text chunks into numerical vector representations.

These embeddings capture the semantic meaning of the text.

### 3. Vector Storage

Document chunks and their embeddings are stored in MongoDB Atlas.

A MongoDB Atlas Vector Search index enables similarity-based retrieval over the stored embeddings.

### 4. Retrieval

When a user asks a question:

```text
User Question
      ↓
Generate Query Embedding
      ↓
MongoDB Vector Search
      ↓
Retrieve Relevant Chunks
```

The most semantically relevant chunks are selected as context.

### 5. Generation

The retrieved context is combined with the user's question and relevant conversation history before generating the final response.

This allows the application to answer questions using information contained in the user's uploaded documents.

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### RAG / AI

* MongoDB Atlas Vector Search
* Sentence Transformers
* `all-MiniLM-L6-v2`
* FastAPI
* Uvicorn

### Development & Deployment

* Git
* GitHub
* MongoDB Atlas
* Vercel / Render

## Project Structure

```text
project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   └── package.json
│
├── embedding-service/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
└── README.md
```

## Environment Variables

### Backend

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
EMBEDDING_SERVICE_URL=http://localhost:8000
OPENAI_API_KEY=your_openai_api_key
```

### Frontend

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Adjust the values according to your deployment environment.

## MongoDB Atlas Configuration

The application requires a MongoDB Atlas cluster with Vector Search enabled.

Create a Vector Search index for the collection containing document chunks.

A typical configuration uses:

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 384,
      "similarity": "cosine"
    }
  ]
}
```

The `384` dimensions correspond to the `all-MiniLM-L6-v2` embedding model.

The index name used by the application is:

```text
vector_index
```

## Running Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Set up the embedding service

```bash
cd ../embedding-service

python -m venv venv
```

Activate the virtual environment.

Windows:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 5. Start the embedding service

```bash
uvicorn main:app --reload --port 8000
```

### 6. Start the backend

```bash
cd backend
npm run dev
```

### 7. Start the frontend

```bash
cd frontend
npm run dev
```

The frontend should then be available at the Vite development URL.

## API Overview

### Documents

```text
POST   /api/documents
GET    /api/documents
DELETE /api/documents/:id
```

Used for uploading, retrieving, and deleting documents.

### Chat

```text
POST /api/chat/search
```

Performs semantic retrieval and generates a response using relevant document context.

### Conversations

```text
GET    /api/conversations
POST   /api/conversations
DELETE /api/conversations/:id
```

Used to create, retrieve, and delete conversations.

### Messages

Messages are persisted in MongoDB and associated with their respective conversations.

This allows conversations to be restored after refreshing or reopening the application.

## Data Flow

For a new document:

```text
PDF
 ↓
Document Service
 ↓
Text Extraction
 ↓
Chunk Service
 ↓
Embedding Service
 ↓
MongoDB
```

For a chat request:

```text
Question
 ↓
Chat Service
 ↓
Embedding Generation
 ↓
MongoDB Vector Search
 ↓
Relevant Chunks
 ↓
Conversation Context
 ↓
LLM
 ↓
Response
 ↓
MongoDB Message Storage
 ↓
React UI
```

## Key Design Decisions

### MongoDB Atlas Vector Search

MongoDB was used not only as the application's primary database but also as the vector database.

This keeps document metadata, embeddings, conversations, and messages within the same database ecosystem while still supporting semantic retrieval.

### Separate Embedding Service

Embedding generation is isolated into a Python FastAPI service.

This allows the Node.js backend to communicate with the machine-learning model without mixing Python ML dependencies into the main application.

### Persistent Chat History

Messages are stored independently from the frontend state.

This means the UI is not the source of truth for conversation history. Conversations can be reconstructed directly from the database.

### Chunk-Based Retrieval

Documents are divided into smaller chunks rather than embedding entire documents.

This improves retrieval precision because the vector search can return the specific sections that are relevant to a user's question.

## Error Handling

The application includes handling for common failure states:

* Failed document uploads
* Embedding service failures
* Database errors
* Failed chat requests
* Empty document states
* Empty conversation states
* Loading states
* Destructive-action confirmation dialogs

These states are surfaced through appropriate UI feedback rather than leaving the user staring at a mysterious blank screen, a proud tradition of unfinished web applications.

## Future Improvements

* Streaming AI responses
* Authentication and user-specific document isolation
* Support for additional document formats
* Hybrid keyword + vector search
* Reranking retrieved chunks
* Citation-based responses
* Conversation summarization for long chats
* Background document processing
* Improved observability and logging
* Automated evaluation of retrieval quality

## What This Project Demonstrates

This project demonstrates practical implementation of a production-oriented RAG architecture rather than treating RAG as simply "send some text to an LLM."

It covers:

* Document ingestion
* Text chunking
* Embedding generation
* Vector databases
* Semantic retrieval
* Context-aware generation
* Persistent conversations
* MongoDB data modeling
* REST API development
* Python ML services
* React application architecture
* Error and loading state management
* Full-stack integration

## License

This project is available under the MIT License.
