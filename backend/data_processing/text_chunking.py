import re

def clean_text(text: str) -> str:
    """Basic cleanup to avoid garbage in downstream embeddings."""
    if not text:
        return ""
    text = text.replace("\xa0", " ")       # non-breaking spaces
    text = re.sub(r"\s+", " ", text)       # collapse whitespace
    text = text.strip()
    return text


def chunk_text(text: str, max_tokens: int = 300) -> list:
    """Splits text into semi-even chunks. Not token-perfect, but good enough."""
    
    cleaned = clean_text(text)
    words = cleaned.split()
    
    chunks = []
    current = []

    for word in words:
        current.append(word)

        # crude size control (LLMs don't need exact tokenizer precision)
        if len(current) >= max_tokens:
            chunks.append(" ".join(current))
            current = []

    if current:
        chunks.append(" ".join(current))

    return chunks


def chunk_file_json(json_obj: dict, max_tokens: int = 300) -> list:
    """
    Takes the output of extract_course_materials (a dict with filename + text)
    and returns a list of chunk dicts for storage.
    """
    filename = json_obj.get("filename")
    text = json_obj.get("text", "")

    chunks = chunk_text(text, max_tokens=max_tokens)

    return [
        {
            "filename": filename,
            "chunk_id": i,
            "text": chunk
        }
        for i, chunk in enumerate(chunks)
    ]
