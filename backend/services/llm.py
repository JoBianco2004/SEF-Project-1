# Author: Daniel Valdes
# Date: 11/18/25 -Documented, not created
# File_Name: llm.py
# Description: LLM management file, used to implement or alter LLM behavior and model

#-------------------------------------------------------------------------------------------------
# Modified: 
#-------------------------------------------------------------------------------------------------

from llama_cpp import Llama
from typing import List, Dict, Any, cast
from pathlib import Path

llm: Llama | None = None

def load_model():
    global llm
    if llm is None:
        llm = Llama(
            model_path = str(Path(__file__).parent.parent / "llm_models" / "tinyLlama.gguf"),
            n_ctx=2048,
            n_gpu_layers=1,
            n_threads=6,
            verbose=False,
        )

def chat(messages: List[Dict[str, str]]) -> str:
    load_model()
    response: Dict[str, Any] = cast(Llama, llm).create_chat_completion(
        messages=messages,      # type: ignore[arg-type]
        stream=False,
        max_tokens=512,
        temperature=0.7,
    )
    return response["choices"][0]["message"]["content"]