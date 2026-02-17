from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import health, trust

app = FastAPI(
    title="URTSS API",
    description="Unified Retailer Trust Scoring System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(trust.router, prefix="/api", tags=["trust"])

@app.get("/")
def root():
    return {"message": "URTSS API is running", "version": "1.0.0"}
