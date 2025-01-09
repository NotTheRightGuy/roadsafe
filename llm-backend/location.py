
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from ollama import Client
import json
from geopy.geocoders import Nominatim

app = FastAPI(title="Hazard Detection API")

# Add CORS middleware to allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_from_query(query):
    client = Client()
    prompt = f"""Note: 
    - Hazard types to look for: road closure, potholes, crashes, crash, object on road, stalled vehicle, under construction, low visibility, slippery roads
    - Hazard types to give id exactly as given in the list respectively this : 'road_closure','potholes','crash','obstacle','stalled','construction','low_visibility','slippery'
    - Location should be just the city/place name
    - Do not include any additional text or code.

    Extract hazard type and location from this query: "{query}"
    Output format should be exactly like this, only JSON:
    {{"hazard": "HAZARD_HERE", "location": "LOCATION_HERE"}}
    """

    try:
        response = client.chat(
            model="llama3.2:1b", messages=[{"role": "user", "content": prompt}]
        )
        content = response["message"]["content"].strip()
        if content.startswith("{") and content.endswith("}"):
            try:
                result = json.loads(content)
                return result.get("hazard"), result.get("location")
            except json.JSONDecodeError:
                return None, None
        return None, None
    except Exception as e:
        print(f"Error in extraction: {e}")
        return None, None

def get_coordinates(location):
    if not location:
        return None, None
    
    geolocator = Nominatim(user_agent="my_hazard_app")
    try:
        loc_data = geolocator.geocode(location)
        if loc_data:
            return loc_data.latitude, loc_data.longitude
        return None, None
    except Exception as e:
        print(f"Error getting coordinates: {e}")
        return None, None

def process_hazard_query(query):
    hazard, location = extract_from_query(query)
    lat, lon = get_coordinates(location) if location else (None, None)

    result = {
        "query": query,
        "id": hazard,
        "location": {
            "name": location,
            "coordinates": {"latitude": lat, "longitude": lon},
        },
    }
    return result

class Query(BaseModel):
    text: str

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# API endpoint to process queries
@app.post("/api/process")
async def process_query(query: Query):
    try:
        result = process_hazard_query(query.text)
        return result
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    