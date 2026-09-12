# Enterprise Knowledge Assistant

A Retrieval-Augmented Generation (RAG) application that allows users to upload documents, process their content into recursively split chunks, generate vector embeddings, and interact with them through a context-aware conversational interface.

The system combines **MongoDB Atlas Vector Search**, **Sentence Transformers**, **FastAPI**, **Node.js**, and **React** to provide semantic document search and persistent conversational interactions.

## Features

* **Document Upload & Processing**

  * Upload PDF documents through the application.
  * Extract document text and recursively split it into manageable chunks.
  * Preserve document structure by progressively splitting large sections using smaller separators.
  * Generate semantic embeddings using Sentence Transformers.
  * Store document chunks and embeddings in MongoDB.

* **Semantic Vector Search**

  * Uses MongoDB Atlas Vector Search to retrieve the most relevant document chunks.
  * Performs semantic retrieval rather than relying only on keyword matching.
  * Provides relevant document context to the conversational generation layer.

* **Context-Aware RAG Chat**

  * Ask questions about uploaded documents.
  * Retrieves relevant document context before generating responses.
  * Maintains conversation history across multiple messages.
  * Supports follow-up questions using previous conversation context.
  * Combines conversational history with retrieved document context during response generation.

* **Persistent Conversations**

  * Conversations and messages are stored in MongoDB.
  * Previous conversations can be loaded after refreshing the application.
  * Message history remains available across sessions.
  * Follow-up questions can use previous messages as conversational context.
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
                  ┌─────────────┐ ┌────────────────┐
                  │  MongoDB    │ │    MongoDB     │
                  │ Atlas       │ │  Collections   │
                  │             │ │                │
                  │ Vector      │ │ Documents      │
                  │ Search      │ │ Conversations  │
                  │ Index       │ │ Messages       │
                  └──────┬──────┘ └────────────────┘
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

The application follows a conversational Retrieval-Augmented Generation pipeline:

```text
PDF Upload
    ↓
Text Extraction
    ↓
Recursive Chunking
    ↓
Embedding Generation
    ↓
MongoDB Storage
    ↓
User Question
    ↓
Conversation History
    ↓
Query / Context Retrieval
    ↓
MongoDB Atlas Vector Search
    ↓
Relevant Document Chunks
    ↓
Conversation Context + Retrieved Context
    ↓
LLM Response
    ↓
Persist User Message + Assistant Response
```

### 1. Document Ingestion

When a document is uploaded, its content is extracted and divided into smaller chunks using **recursive chunking**.

Instead of blindly splitting the document at a fixed word boundary, the recursive splitter attempts to preserve meaningful document structure by progressively using smaller separators.

The splitting strategy follows the general hierarchy:

```text
Large document section
        ↓
Paragraph boundaries
        ↓
Line boundaries
        ↓
Sentence boundaries
        ↓
Word boundaries
```

If a section fits within the configured chunk size, it remains intact. If it is too large, the splitter recursively attempts a finer-grained separator.

This produces chunks that are more likely to preserve semantic and structural context.

### 2. Embedding Generation

The application uses the `all-MiniLM-L6-v2` Sentence Transformer model to convert text chunks into numerical vector representations.

These embeddings capture the semantic meaning of the text and allow semantically similar queries and document chunks to be matched.

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
      ↓
Filter Low-Relevance Results
```

The most semantically relevant chunks are selected as context for the generation step.

### 5. Conversational Memory

Conversation messages are persisted in MongoDB using a conversation identifier.

Each message stores:

```text
conversationId
role
content
```

RAG-related information can additionally be stored with assistant messages:

```text
sources
retrievedChunks
```

This allows the system to retain previous interactions and use conversation history when handling follow-up questions.

For example:

```text
User:
What technologies does BudgetWise use?

Assistant:
BudgetWise uses React, Node.js and MongoDB.

User:
Why was it chosen?
```

The previous conversation provides context for understanding references such as **"it"** and **"chosen"**.

### 6. Generation

The retrieved document context is combined with the relevant conversation history and the current question before generating the final response.

The LLM therefore receives two different forms of context:

```text
Conversation Context
        +
Retrieved Document Context
        +
Current Question
        ↓
       LLM
        ↓
     Answer
```

Conversation history helps the model understand follow-up questions, while retrieved document chunks provide factual information from the uploaded knowledge base.

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
* OpenAI API

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

Performs semantic retrieval and generates a response using relevant document context and conversation history.

### Conversations

```text
GET    /api/conversations
POST   /api/conversations
DELETE /api/conversations/:id
```

Used to create, retrieve, and delete conversations.

### Messages

Messages are persisted in MongoDB and associated with their respective conversations.

Each message can contain:

* Message role
* Message content
* Conversation identifier
* Retrieved document sources
* Retrieved chunks and similarity scores

This allows conversations and their associated RAG retrieval information to be reconstructed after refreshing or reopening the application.

## Data Flow

### Document ingestion

```text
PDF
 ↓
Document Service
 ↓
Text Extraction
 ↓
Recursive Chunking
 ↓
Embedding Service
 ↓
MongoDB
```

### Conversational RAG

```text
Question
 ↓
Chat Service
 ↓
Load Conversation History
 ↓
Generate Query Embedding
 ↓
MongoDB Vector Search
 ↓
Relevant Chunks
 ↓
Conversation Context + RAG Context
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

### Recursive Chunking

Documents are processed using recursive chunking rather than simply dividing text into fixed-size blocks.

The splitter attempts to preserve larger semantic structures first and only moves to smaller separators when necessary.

This helps prevent important sentences, paragraphs, or sections from being unnecessarily fragmented.

### Separate Embedding Service

Embedding generation is isolated into a Python FastAPI service.

This allows the Node.js backend to communicate with the machine-learning model without mixing Python ML dependencies into the main application.

### Persistent Conversational Memory

Conversation history is stored independently from frontend state.

Messages are associated with a `conversationId`, allowing previous interactions to be retrieved and used as conversational context.

This separates:

```text
RAG Knowledge
    ↓
Uploaded documents

Conversational Memory
    ↓
Previous messages
```

The two sources can then be combined during answer generation.

### Chunk-Based Retrieval

Documents are divided into smaller semantically meaningful chunks rather than embedding entire documents.

This improves retrieval precision because vector search can return the specific sections relevant to a user's question.

### Retrieval Relevance Threshold

Retrieved chunks are evaluated using their vector similarity scores.

Low-confidence retrieval results can be rejected rather than blindly sending unrelated document content to the LLM.

This reduces the likelihood of generating answers from irrelevant context.

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
* Low-relevance retrieval results

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
* Query rewriting for improved conversational retrieval

## What This Project Demonstrates

This project demonstrates practical implementation of a production-oriented **conversational RAG architecture** rather than treating RAG as simply "send some text to an LLM."

It covers:

* Document ingestion
* Recursive text chunking
* Embedding generation
* Vector databases
* Semantic retrieval
* Retrieval relevance filtering
* Context-aware generation
* Conversational memory
* Persistent conversations
* MongoDB data modeling
* REST API development
* Python ML services
* React application architecture
* Error and loading state management
* Full-stack integration

## License

This project is available under the MIT License.
