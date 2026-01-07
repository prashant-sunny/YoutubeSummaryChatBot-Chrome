'''from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from youtubychatbot import chatbot

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(data: dict):
    user_msg = data["message"]
    video_ID = data["videoID"]
    output_msg = chatbot(user_msg,video_ID)

    #return {"reply": f"You said: {user_msg}"}
    return {"reply":  {output_msg}}'''
from fastapi import FastAPI
from pytube import extract
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from youtubychatbot import chatbot

app = FastAPI()

# Allow Chrome Extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class YouTubeRequest(BaseModel):
    video_id: str
    message: str

@app.post("/chat")
async def process_video(data: YouTubeRequest):
    print(data)
    video_id = data.video_id
    user_msg = data.message
    #VideoCorrectID = extract.video_id(video_id)
    output_msg = chatbot(user_msg,video_id)
    

    # 🔥 PROCESSING PLACEHOLDER
    # fetch transcript
    # summarize
    # store in DB
    # call LLM

    '''return {
        "status": "success",
        "video_id": VideoCorrectID
    }'''
    return {"reply":  {output_msg}}

