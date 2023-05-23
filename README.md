# Project introduction

The application allows a company to view their product-templates and the produced products which is based on a product-template.
When clicking on a product-template; parameters, journal and all the produced products of that specific template will be shown.

It is possible to sort the table by clicking on the column headers and it is also possible to search for a specific entry for the selected column in the search bar.

Since the table can contain a lot of entries, a number of entries is fetched when reaching the bottom of the table. This is done to improve responsiveness of the web application.

The project consist of a database (PostgreSQL), a backend (Flask) and a frontend (React). All three are running on their own server.

The backend is responsible for handling the requests from the frontend and communicating with the database. The frontend is responsible for displaying the data from the backend and sending requests to the backend.

To access the web application, the user must access the frontend server (port 3000).

The PostgreSQL database consist of 8 tables and the relations between them are shown the diagram 'docs/ER-diagram.png'.

# Running the project

## Prerequisites

- PostgreSQL and pgAdmin: https://www.postgresql.org/download/
- Python 3.8 and newer.
- Optional: Package manager for Python (pip, conda, etc.)
- NodeJS and npm: https://nodejs.org/en/download

## Using docker
Run in shell:

`docker-compose up`

## Database setup

To create the database, a script is created (create.sql) which can be run in the PostgreSQL shell.

`psql -U postgres -f create.sql`

## Backend setup

If you are using a package manager, it is recommended to create a virtual environment for the project.

To install the required packages, run `pip install -r requirements.txt` in the 'backend' folder.

Afterwards, the backend can be started by running `python backend.py` in the 'backend' folder.

## Frontend setup

To install the required packages, run `npm install` in the 'frontend' folder.

Afterwards, the frontend can be started by running `npm start` in the 'frontend' folder.

You can now access the web application on http://localhost:3000
