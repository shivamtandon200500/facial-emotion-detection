import json
import io
import base64

from typing import Optional
from fastapi import FastAPI, WebSocket,HTTPException
from fastapi.middleware.cors import CORSMiddleware

import cv2
import numpy as np
from fer import FER

import pymongo
from pymongo import MongoClient
from pydantic import BaseModel, EmailStr, constr

from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Optional

app = FastAPI()
detector = FER()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient('mongodb+srv://emotiondetection:APbx3bLoy0hh9n8Y@cluster0.xkcafdg.mongodb.net/?retryWrites=true&w=majority')
db = client['mydatabase']
# collection = db['mycollection']

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class User(BaseModel):
    name: constr(min_length=2, max_length=50)
    email: EmailStr
    password: constr(min_length=8, max_length=100)

class UserLogin(BaseModel):
    email: EmailStr
    password: constr(min_length=8, max_length=100)

class LoggedInUser(BaseModel):
    name: constr(min_length=2, max_length=50)
    email: EmailStr
    
class Token(BaseModel):
    access_token: str
    token_type: str
    user:LoggedInUser

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user_by_email(email):
    users = db['users']
    return users.find_one({'email': email})

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/signup")
async def create_user(user: User):
    
    db_user = get_user_by_email(user.email)
    if db_user is not None:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    user_dict = user.dict()
    user_dict['hashed_password'] = get_password_hash(user_dict['password'])
    user_dict.pop('password')
    users = db['users']
    result = users.insert_one(user_dict)
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token({"sub": user.email}, expires_delta=access_token_expires)

    return {"message": "User created successfully"}

@app.post("/login")
async def login(user: UserLogin):
    # Check if user exists and password is correct
    db_user = get_user_by_email(user.email)
    if db_user is None or not verify_password(user.password, db_user['hashed_password']):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token({"sub": db_user['email']}, expires_delta=access_token_expires)
    # Create token response with user info
    token = Token(access_token=access_token, token_type="bearer",user=db_user)
    return token

print("titi")
@app.websocket("/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    #while True:
    try:
        payload = await websocket.receive_text()
        payload = json.loads(payload)
        imageByt64 = payload['data']['image'].split(',')[1]
        # decode and convert into image
        image = np.fromstring(base64.b64decode(imageByt64), np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        
        # Detect Emotion via Tensorflow model
        prediction = detector.detect_emotions(image)
        response = {
            "predictions": prediction[0]['emotions'],
            "emotion": max(prediction[0]['emotions'], key=prediction[0]['emotions'].get)
        }
        print("response",response);
        await websocket.send_json(response)
        websocket.close()
    except:
        websocket.close()

@app.post("/predict")
async def predict_emotions(payload: dict):
    # Extract base64-encoded image data from payload
    imageByt64 = payload['data']['image'].split(',')[1]
    # Decode and convert into image
    image = np.fromstring(base64.b64decode(imageByt64), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    
    # Detect emotions via TensorFlow model
    prediction = detector.detect_emotions(image)
    response = {
        "predictions": prediction[0]['emotions'],
        "emotion": max(prediction[0]['emotions'], key=prediction[0]['emotions'].get)
    }
    return response