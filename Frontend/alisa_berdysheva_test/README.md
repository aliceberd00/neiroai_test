
# Alisa Berdysheva test task for Neiro.io

The project consists of two parts: frontend and backend.

The entire commit history can be viewed in this [project:](http://gitlab.digitalberd.com/gitlab-instance-a140ef27/alisa_test.git)

CI/CD has also been set up in the project.

## Backend

The backend was developed by another developer.

The backend is built with FastAPI + SQLAlchemy, and the database is PostgreSQL.

The backend is responsible for:

* User registration and login

* Storing information about bots

* Storing user conversations with bots

* Interacting with the bots' API

The backend is deployed on a server using Docker, and the API is [accessible at](https://api-alisa-test.digitalberd.com)

If desired, you can also run it locally in Docker on port 8031.

Additionally, interaction with the chatbot is implemented in the backend because the frontend API was not returning data due to CORS policy.


## Frontend:
The frontend is built with React using TypeScript and Material UI.

Google Analytics was not added since it wasn't required. The robots.txt file was also not configured.

Error logging is implemented through Sentry (the stability of the application and the quality of the code will be evaluated).

The frontend can be run locally or you can [view it live at](https://alisa-test.digitalberd.com)

The website's performance score is [99 out of 100](https://pagespeed.web.dev/analysis/https-alisa-test-digitalberd-com/aiscphk20v?form_factor=desktop).

When visiting the site, the user is prompted to either register or log in.

After registration/login, the user is redirected to a page with a list of chats with bots.

The bot's name, avatar, and the last message exchanged with it are displayed.

The user can then proceed to a conversation with any bot (both bots are powered by Anthropic).

During interactions with the bots, both user and bot messages are saved to the database in the following order:

* First, receiving the bot's response

* Then, saving our message

* Finally, saving the bot's response

Upon a new login, the entire conversation history with the bot is retrieved from the database and loaded.
