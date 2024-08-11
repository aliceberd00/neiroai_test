import datetime


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import sys
sys.path.append("..")

from utils.deps import get_session, current_user
from models.f_messages import Messages
from models.d_user import User

from fastapi.responses import JSONResponse

from pydantic import BaseModel
from sqlalchemy import select, and_
from typing import List

router = APIRouter(
    prefix='/messages',
    tags=['messages']
)


class MessageResponse(BaseModel):
    id: int
    created_at: str
    message: str
    is_deleted: bool
    is_user_message: bool


@router.get("/get_user_bot_messages", response_model=List[MessageResponse] | None)
async def get_user_bot_messages(bot_id: int, session: Session = Depends(get_session), user: User = Depends(current_user)):
    """
    Get all messages
    """
    if user is None:
        raise HTTPException(status_code=401, detail="You not authorized")
    q_messages = await session.execute(select(Messages).where(and_(
        Messages.user_id == user.id, Messages.bot_id == bot_id, Messages.is_deleted == False
    )).order_by(Messages.id.asc()))
    q_messages = q_messages.all()
    if q_messages is not None:
        l_messages = [
            {
                "id": one_message[0].id,
                "created_at": str(one_message[0].created_at),
                "message": one_message[0].message,
                "is_user_message": one_message[0].is_user_message
            }
            for one_message in q_messages
        ]
        return JSONResponse(content=l_messages)
    else:
        return None


class NewMessage(BaseModel):
    bot_id: int
    message: str
    is_user_message: bool


@router.post("/create_new_message", response_model=MessageResponse | None)
async def create_new_message(data: NewMessage, session: Session = Depends(get_session), user: User = Depends(current_user)):
    """
    creating new message
    bot_id: bot id
    message: message
    is_user_message: if message from user - set True, if message from bot - set False
    """
    if user is not None:
        new_message = Messages(
            user_id=user.id,
            bot_id=data.bot_id,
            message=data.message,
            is_user_message=data.is_user_message,
            created_at=datetime.datetime.utcnow()
        )
        session.add(new_message)
        # await session.commit()
        await session.flush()
        await session.refresh(new_message)
        await session.commit()
        d_result = {
            "id": new_message.id,
            "created_at": str(new_message.created_at),
            "message": new_message.message,
            "is_deleted": new_message.is_deleted,
            "is_user_message": new_message.is_user_message
        }
        return JSONResponse(content=d_result)
    else:
        raise HTTPException(status_code=401, detail="You not authorized")