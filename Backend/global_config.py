
YOUR_DOMAIN = 'https://www.offline-conversions.com/payments'

DB_HOST = '65.21.237.252'
DB_PORT = '5432'
DB_NAME = 'alisa_test'
DB_USER = 'backend_test_user'
DB_PASS = 'fdJGmi37dVb4a'

SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
ASYNC_SQLALCHEMY_DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

SENTRY_FASTAPI_DSN = "https://61330dc686604db4849f7b7167874631@sentry.digitalberd.com/9"
