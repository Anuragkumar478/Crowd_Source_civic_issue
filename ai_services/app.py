from fastapi import  FastAPI
from dotenv import load_dotenv
from langchain_mistralai.chat_models import ChatMistralAI
from langchain_core.messages import HumanMessage, SystemMessage
from pydantic import BaseModel

app=FastAPI()

load_dotenv()

model=ChatMistralAI(
    model="mistral-small-2506",
    temperature=0
)

class IssueRequest(BaseModel):
     description: str

class AIResponse(BaseModel):
     category:str
     priority:str
     summary:str

structured_model = model.with_structured_output(AIResponse)     

@app.post("/analyze")
def analyze_issue(data: IssueRequest):

    messages=[
        SystemMessage(
            content="""
            
            You are an AI assistant for a civic issue reporting system.

            Analyze the user's complaint.

            Return:
            category
            priority
            summary

            Categories:
            Road
            Water
            Waste Management
            Electricity
            Street Lighting
            Drainage & Sewage
            Pollution
            Public Safety
            Public Transport
            Public Infrastructure
            Other

            Priority:
            Low
            Medium
            High
            """
        ),
        HumanMessage(content=data.description)
    ]

    response= structured_model.invoke(messages)

    return response
