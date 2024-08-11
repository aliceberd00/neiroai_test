from datetime import datetime
from sqlalchemy import Column, String, Boolean, Integer, TIMESTAMP, BigInteger

import sys
sys.path.append("..")
from models.global_base import Base

class Messages(Base):
    __tablename__ = "f_messages"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False, index=True, default=0)
    bot_id = Column(Integer, nullable=False, index=True, default=0)
    created_at = Column(TIMESTAMP, default=datetime.utcnow(), index=True)
    message = Column(String(length=4000), nullable=False)
    is_deleted = Column(Boolean, nullable=False, default=False, index=True)
    is_user_message = Column(Boolean, nullable=False, default=True, index=True)
