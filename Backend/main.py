from fastapi_users import FastAPIUsers
import uvicorn
from fastapi import FastAPI

from auth.auth import auth_backend
from auth.manager import get_user_manager
from auth.schemas import UserRead, UserCreate

from fastapi.middleware.cors import CORSMiddleware
from global_config import SENTRY_FASTAPI_DSN


import router_user.router_user as r_user
import router_messages.router_messages as r_messages
import router_bot.router_bot as r_bot
import router_bot_api.router_bot_api as r_bot_api

from models.d_user import User
import sentry_sdk


sentry_sdk.init(
    dsn=SENTRY_FASTAPI_DSN,
    traces_sample_rate=1.0,
)

app = FastAPI(
    title="Alisa Test"
)
origins = ["http://localhost:3000", "http://localhost:8031", "https://alisa-test.digitalberd.com"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


import models.create_all as ca
ca.create_all()

#Как логиниться - несколько методов.
fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(fastapi_users.get_register_router(UserRead, UserCreate),
                   prefix='/auth',
                   tags=['auth'])
#Добавляем роуты
app.include_router(r_user.router)
app.include_router(r_messages.router)
app.include_router(r_bot.router)
app.include_router(r_bot_api.router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8031)
    # uvicorn.run(app, host="localhost", port=8031)

