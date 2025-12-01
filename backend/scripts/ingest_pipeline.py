import os
import json
import faiss
import numpy as np
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from data_processing.text_chunking import chunk_text
from data_processing.embedding import Embedder

EXTRACTED_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data_processing", "extracted_text"))

def save_faiss_index(embeddings, metadata, index_path, meta_path):
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    faiss.write_index(index, index_path)

    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

def ingest_pipeline():
    model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "llm_models", "e5-base-v2"))
    embedder = Embedder(model_path)

    all_embeddings = []
    all_metadata = []

    for filename in os.listdir(EXTRACTED_DIR):
        if not filename.endswith(".json"):
            continue

        file_path = os.path.join(EXTRACTED_DIR, filename)
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        text = data.get("text", "")
        if not text.strip():
            continue

        chunks = chunk_text(text)
        if not chunks:
            continue

        embeddings = embedder.embed(chunks)
        embeddings_np = embeddings.cpu().numpy()

        for i, chunk_text_ in enumerate(chunks):
            all_embeddings.append(embeddings_np[i])
            all_metadata.append({
                "source_file": data["filename"],
                "chunk_id": i,
                "text": chunk_text_
            })

        print(f"Processed {filename}: {len(chunks)} chunks.")

    if not all_embeddings:
        print("No embeddings found, exiting.")
        return

    all_embeddings_np = np.vstack(all_embeddings)

    index_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "faiss_index.idx"))
    meta_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "faiss_metadata.json"))

    save_faiss_index(all_embeddings_np, all_metadata, index_path, meta_path)

    print(f"Saved FAISS index to {index_path}")
    print(f"Saved metadata to {meta_path}")

if __name__ == "__main__":
    ingest_pipeline()
