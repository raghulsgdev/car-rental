from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)

class User(BaseModel):
    customer_name: str
    email: str
    phone: str
    password: str


@app.post("/users/register")
def insert_user():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="car_rental",
        port="3306"
    )

    cursor = mydb.cursor(dictionary=True)

    query = "SELECT * FROM users"
    # values = (data.customer_name, data.email, data.phone, data.password)
    cursor.execute(query)
    result = cursor.fetchall()

    return result