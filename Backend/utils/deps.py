from typing import Generator
from fastapi_users import FastAPIUsers

import sys
sys.path.append("..")
from auth.database import User
from utils.session import SessionLocal, async_session
from auth.manager import get_user_manager
from auth.auth import auth_backend
from typing import AsyncIterator
from sqlalchemy.ext.asyncio import AsyncSession

#Такой подход позволяет не создавать каждый раз новую сессию - а использовать везде одну и ту же.
# db = SessionLocal()
async def get_session() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        ...
        await db.close()

async def get_session() -> AsyncIterator[AsyncSession]:
    async with async_session() as session:
        yield session

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

current_user = fastapi_users.current_user(optional=True)
