import sys

# from sqlalchemy import create_engine
import sqlalchemy
# from aiopg.sa import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.asyncio import async_sessionmaker

sys.path.append("..")
from global_config import ASYNC_SQLALCHEMY_DATABASE_URL


engine = create_async_engine(
    url=ASYNC_SQLALCHEMY_DATABASE_URL,
    echo=False  #Если тут сделать True - запросы к БД будут выводиться в STD OUT
)

SessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False)

async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)
