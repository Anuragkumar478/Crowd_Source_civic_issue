## AI Service

The AI service is built using FastAPI, LangChain, and Mistral AI.

### Responsibilities

- Analyze civic complaints
- Categorize complaints
- Determine priority
- Generate a concise summary

### Run locally

```bash
cd ai_service

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload