import datetime
import sys

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi import Depends
from sqlalchemy.orm import Session
from datetime import timedelta
sys.path.append("..")

from sqlalchemy import select, update
from utils.deps import get_session, current_user
from models.d_user import User
from pydantic import BaseModel


router = APIRouter(
    prefix='/user',
    tags=['user']
)

@router.get("/me")
async def get_current_user(db: Session = Depends(get_session), user: User = Depends(current_user)):
    if user is None:
        return {
        "id": "",
        "email": "",
        "username": ""
    }
    else:
        return {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }