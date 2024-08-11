import datetime
from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlalchemy import Column, String, Boolean, Integer, TIMESTAMP

import sys
sys.path.append("..")
from models.global_base import Base
class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "d_user"
    id = Column(Integer, primary_key=True)
    registered_at = Column(TIMESTAMP, default=datetime.datetime.utcnow)
    is_active: bool = Column(Boolean, default=True, nullable=False)
    is_superuser: bool = Column(Boolean, default=False, nullable=False)
    is_verified: bool = Column(Boolean, default=False, nullable=False)
    hashed_password: str = Column(String(length=1024), nullable=False)
    email = Column(String, nullable=False, unique=True)
    username = Column(String, nullable=False)
