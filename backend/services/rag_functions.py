import os
import json
import faiss
import numpy as np
from ..data_processing.embedding import Embedder
from .llm import chat

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
INDEX_PATH = os.path.join(BASE_DIR, "faiss_index.idx")
META_PATH = os.path.join(BASE_DIR, "faiss_metadata.json")
EMBEDDER_MODEL_PATH = os.path.join(BASE_DIR, "llm_models", "e5-base-v2")

# Load FAISS
index = faiss.read_index(INDEX_PATH)

# Load metadata
with open(META_PATH, "r", encoding="utf-8") as f:
    metadata = json.load(f)

# Load embedder
embedder = Embedder(EMBEDDER_MODEL_PATH)


def _to_numpy(x):
    if hasattr(x, "detach"):
        return x.detach().cpu().numpy()
    if hasattr(x, "cpu"):
        return x.cpu().numpy()
    if isinstance(x, np.ndarray):
        return x
    return np.array(x)


def _truncate_text(text: str, max_chars: int = 1200) -> str:
    """Reduce text size so the LLM doesn't exceed its context window."""
    if len(text) <= max_chars:
        return text
    return text[:max_chars] + "..."


def answer(question: str, top_k: int = 5):
    # Embed the question
    q_emb = embedder.embed([question])
    q_emb = _to_numpy(q_emb).astype("float32")

    if q_emb.ndim == 1:
        q_emb = q_emb.reshape(1, -1)

    distances, indices = index.search(q_emb, top_k)

    retrieved_chunks = []
    for idx in indices[0]:
        if 0 <= idx < len(metadata):
            text = metadata[idx].get("text", "")
            if text:
                text = _truncate_text(text, max_chars=1200)
                retrieved_chunks.append(text)

    # Combine chunks and truncate combined context too
    combined_context = "\n\n".join(retrieved_chunks)
    combined_context = _truncate_text(combined_context, max_chars=3000)

    messages = [
        {
            "role": "system",
            "content": (
                "You answer student questions only using the provided course materials. "
                "If the materials do not contain the answer, say you do not know."
            )
        },
        {
            "role": "user",
            "content": (
                "Use the course materials below to answer the question.\n\n"
                f"{combined_context}\n\n"
                f"Question: {question}\n"
                "Answer:"
            )
        }
    ]

    answer_text = chat(messages)
    return {"answer": answer_text}
