import json
import os

host = os.getenv("HOST", "0.0.0.0")
port = int(os.getenv("PORT", "9000"))
version = "v1.0"
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "local-development-only-change-me")

GOOGLE_SHEET_ID = os.getenv("GOOGLE_SHEET_ID", "")
GOOGLE_SHEET_RANGE_FEEDBACK = os.getenv("GOOGLE_SHEET_RANGE_FEEDBACK", "Data")
GOOGLE_SHEET_CREDENTIALS_JSON = os.getenv("GOOGLE_SHEET_CREDENTIALS_JSON", "")
GOOGLE_SHEET_JSON_DICT = (
    json.loads(GOOGLE_SHEET_CREDENTIALS_JSON)
    if GOOGLE_SHEET_CREDENTIALS_JSON
    else None
)
