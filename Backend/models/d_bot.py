from sqlalchemy import Column, String, Boolean, Integer
import sys
sys.path.append("..")
from models.global_base import Base

class Bot(Base):
    __tablename__ = "d_bot"
    id = Column(Integer, primary_key=True)
    bot_name = Column(String(length=100), nullable=True, index=True)
    bot_type = Column(String(length=100), nullable=True, index=True)
    bot_model_name = Column(String(length=100), nullable=True, index=True)
    api_key = Column(String(length=1000), nullable=True)
    api_img_url = Column(String(length=2000), nullable=True)
    is_active = Column(Boolean, nullable=False, default=True, index=True)
