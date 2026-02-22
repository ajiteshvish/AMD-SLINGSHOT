from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import health, trust, admin

app = FastAPI(
    title="Trustora API",
    description="Trust Intelligence Platform for Online Marketplaces",
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
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])

@app.get("/")
def root():
    return {
        "message": "Trustora API is running", 
        "version": "1.0.0",
        "docs": "/docs"
    }
