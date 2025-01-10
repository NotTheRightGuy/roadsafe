from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from ollama import Client
import json
from reverseGeoEncoding import reverseGeoEncoding

app = FastAPI(title="Hazard Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def prompt(current_location, api_response, query):
    client = Client()
    prompt = f"""
    You are an helpful assistant who specialises in answering users query regarding the various incidents happening around them.
    Be concise with your answer and explain it properly. It must convey the idea and points without giving extra information.
    Never use the raw coordinates in the answer. Always convert them to a human-readable address.
    The user currently lives at position {reverseGeoEncoding(current_location["latitude"], current_location["longitude"])} located at {current_location}.
    These are the various incidents that has occured : {api_response}
    Answer the following question now: {query}
    """
    try:
        response = client.chat(
            model="llama3.2:1b", messages=[{"role": "user", "content": prompt}]
        )
        print(response)
        return response.message.content
    except Exception as e:
        print(f"Error in extraction: {e}")
        return "Sorry, I am unable to process your request at the moment. Please try again later."


class Incident(BaseModel):
    id: int
    created_at: str
    longitude: float
    latitude: float
    reported_at: str
    incident_type: str
    reported_by: str

class Query(BaseModel):
    text: str
    current_position: Optional[dict] = None
    api_response: List[Incident] = None

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# API endpoint to process queries
@app.post("/api/process")
async def process_query(query: Query):
    print(query)
    try:
        result = prompt(query.current_position, query.api_response, query.text)
        return {"response": result}
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
