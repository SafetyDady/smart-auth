from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.auth import router as auth_router

app = FastAPI(title="Smart Village Auth API", version="0.1.0")

# CORS middleware  
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # Next.js default
        "http://localhost:5173",   # Vite default  
        "http://localhost:5174",   # Vite alternative
        "http://localhost:5175",   # Vite alternative
        "http://localhost:5176",   # Vite alternative
        "http://localhost:5177",   # Vite alternative
        "http://localhost:8080",   # Vue.js default
        "http://127.0.0.1:5173",   # Local IP
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "http://127.0.0.1:5176", 
        "http://127.0.0.1:5177"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Smart Village Auth API"}

@app.get("/health")
async def health():
    return {"status": "ok"}
