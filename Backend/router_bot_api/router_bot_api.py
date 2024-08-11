import datetime


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import sys
sys.path.append("..")

from utils.deps import get_session, current_user
from models.f_messages import Messages
from models.d_bot import Bot
from models.d_user import User

from fastapi.responses import JSONResponse

from pydantic import BaseModel
from sqlalchemy import select, and_
from typing import List
from anthropic import Anthropic

router = APIRouter(
    prefix='/bot_api',
    tags=['bot_api']
)


class MessageResponse(BaseModel):
    id: int
    created_at: str
    message: str
    is_deleted: bool
    is_user_message: bool

class NewMessage(BaseModel):
    bot_id: int
    message: str


@router.post("/send_message_to_bot", response_model=str | None)
async def create_new_message(data: NewMessage, session: Session = Depends(get_session), user: User = Depends(current_user)):
    """
    creating new message
    bot_id: bot id
    message: message
    is_user_message: if message from user - set True, if message from bot - set False
    """
    q_bot = await session.execute(select(Bot).where(Bot.id == data.bot_id))
    q_bot = q_bot.first()
    if q_bot is not None:
        o_bot = q_bot[0]
        client = Anthropic(
            # This is the default and can be omitted
            api_key=o_bot.api_key,
        )

        message = client.messages.create(
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": data.message,
                }
            ],
            model=o_bot.bot_model_name,
        )
        if message.type == "error":
            raise HTTPException(status_code=400, detail=message.error.message)
        else:
            return JSONResponse(content={"message": message.content[0].text})
    else:
        raise HTTPException(status_code=401, detail="You not authorized")