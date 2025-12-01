import os
import json
import sys

# Ensure backend folder is importable
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from data_processing.text_extraction import (
    extract_text_from_pdf,
    extract_text_from_docx,
    extract_text_from_pptx
)

COURSE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "course_materials"))
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data_processing", "extracted_text"))


def ensure_output_dir():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)


def ingest():
    ensure_output_dir()

    extracted = {}

    for root, _, files in os.walk(COURSE_DIR):
        for file in files:
            full_path = os.path.join(root, file)
            lower = file.lower()

            print(f"Extracting: {file}")

            try:
                if lower.endswith(".pdf"):
                    text = extract_text_from_pdf(full_path)
                elif lower.endswith(".docx"):
                    text = extract_text_from_docx(full_path)
                elif lower.endswith(".pptx"):
                    text = extract_text_from_pptx(full_path)
                else:
                    print(f"Skipped unsupported file: {file}")
                    continue

                extracted[file] = text

                # Strip original extension for cleaner JSON filenames
                base_name = os.path.splitext(file)[0]
                out_path = os.path.join(OUTPUT_DIR, f"{base_name}.json")
                with open(out_path, "w", encoding="utf-8") as f:
                    json.dump({"filename": file, "text": text}, f, indent=2)

                print(f"Saved extracted text to: {out_path}")

            except Exception as e:
                print(f"Error processing {file}: {e}")

    print("\nExtraction complete.")


if __name__ == "__main__":
    ingest()
