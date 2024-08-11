import sys

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

sys.path.append("..")

from utils.deps import get_session, current_user
from models.d_bot import Bot
from models.d_user import User

from fastapi.responses import JSONResponse

from pydantic import BaseModel
from sqlalchemy import select, text, and_, or_
from typing import List

router = APIRouter(
    prefix='/bot',
    tags=['bot']
)


class BotResponse(BaseModel):
    id: int
    bot_name: str
    bot_type: str
    bot_model_name: str
    api_key: str
    api_img_url: str
    last_message_time: str
    last_message: str


@router.get("/get_all_bots", response_model=List[BotResponse] | None)
async def get_all_bots(session: Session = Depends(get_session), user: User = Depends(current_user)):
    """
    Get all bots info
    """
    # q_bots = await session.execute(select(Bot).where(Bot.is_active == True))
    # q_bots = q_bots.all()
    if user is None:
        raise HTTPException(status_code=401, detail="You not authorized")
    result = await session.execute(text(f"""SELECT B.id, B.bot_name, B.bot_type, B.bot_model_name, B.api_key, B.api_img_url, 
COALESCE(LM.created_at::VARCHAR(19), 'EMPTY') AS last_message_time, 
COALESCE(LM.message, 'EMPTY') AS last_message
FROM public.d_bot B
LEFT JOIN (SELECT bot_id, created_at, message, ROW_NUMBER() OVER(PARTITION BY bot_id ORDER BY created_at DESC) AS N
FROM public.f_messages 
WHERE 
	user_id = {str(user.id)}
	AND is_deleted = FALSE) LM ON 
	B.id = LM.bot_id
	AND LM.N = 1
WHERE B.is_active = True"""))
    result = result.all()
    if result != None:
        l_bots = [
            {
                "id": one_bot[0],
                "bot_name": one_bot[1],
                "bot_type": one_bot[2],
                "bot_model_name": one_bot[3],
                "api_key": one_bot[4],
                "api_img_url": one_bot[5],
                "last_message_time": one_bot[6],
                "last_message": one_bot[7]
            }
            for one_bot in result
        ]
        return JSONResponse(content=l_bots)
    else:
        return None


@router.get("/get_one_bot_info", response_model=BotResponse | None)
async def get_one_bot_info(bot_id: int, session: Session = Depends(get_session)):
    """
    Get one bot info
    """
    q_bots = await session.execute(select(Bot).where(Bot.id == bot_id))
    q_bots = q_bots.first()
    if q_bots is not None:
        o_bot = {
            "id": q_bots[0].id,
            "bot_name": q_bots[0].bot_name,
            "bot_type": q_bots[0].bot_type,
            "bot_model_name": q_bots[0].bot_model_name,
            "api_key": q_bots[0].api_key,
            "api_img_url": q_bots[0].api_img_url,
            "last_message_time": "",
            "last_message": ""
        }
        return JSONResponse(content=o_bot)
    else:
        return None
