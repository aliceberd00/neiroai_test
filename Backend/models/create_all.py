from sqlalchemy import create_engine
import sys
sys.path.append("..")
from global_config import SQLALCHEMY_DATABASE_URL
from models.global_base import Base

import models.d_user
import models.d_bot
import models.f_messages

def create_all():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    Base.metadata.create_all(bind=engine)

    print("tables created")

# create_all()
