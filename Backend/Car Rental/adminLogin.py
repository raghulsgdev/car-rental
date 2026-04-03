from fastapi import FastAPI
import mysql.connector
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

@app.post("/admin/login")
async def admin_login(request: Request):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="quiz_game",
        port="3306"
    )

    cursor = mydb.cursor(dictionary=True)
    cursor.execute("SELECT * FROM admin_login")
    result = cursor.fetchall()
    return result

