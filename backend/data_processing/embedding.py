import os
from transformers import AutoTokenizer, AutoModel
import torch

class Embedder:
    def __init__(self, model_path):
        # Normalize Windows paths to avoid issues
        model_path = os.path.normpath(model_path)
        print(f"Loading embedding model from local path: {model_path}")

        self.tokenizer = AutoTokenizer.from_pretrained(model_path, local_files_only=True)
        self.model = AutoModel.from_pretrained(model_path, local_files_only=True)
        self.model.eval()

    def embed(self, texts):
        # texts: list of strings
        inputs = self.tokenizer(texts, padding=True, truncation=True, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model(**inputs)
        # Mean pooling on the last hidden state
        embeddings = outputs.last_hidden_state.mean(dim=1)
        return embeddings


if __name__ == "__main__":
    # Quick test if you want to run directly
    model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "llm_models", "e5-base-v2"))
    embedder = Embedder(model_path)
    test_texts = ["Hello world!", "This is a test sentence."]
    embeddings = embedder.embed(test_texts)
    print(embeddings.shape)  # Should print: torch.Size([2, hidden_size])
