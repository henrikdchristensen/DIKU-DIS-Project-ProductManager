# Project introduction

The project is a web application that allows a company to view their product-templates and the produced products based on the template.
When clicking on a product-template parameters, journal and all the produced products of that template will be shown.

It is possible to sort the tables by clicking on the column headers. It is also possible to search for a specific entry for the selected column in the search bar.

Since the table can contain a lot of entries, a number of entries is fetched when reaching the bottom of the table. This is done to improve responsiveness.

The project consist of a database (PostgreSQL), a backend (Flask) and a frontend (React). All three are running on their own server. To access the web application, the user must access the frontend server (port 3000). The frontend server will then communicate with the backend server (port 5000), which will communicate with the database server (port 5432).

The PostgreSQL database consist of 8 tables and the relations between them.

# Running the project

## Prerequisites

- PostgreSQL and pgAdmin: https://www.postgresql.org/download/
- Python 3.8 and newer.
- Optional: Package manager for Python (pip, conda, etc.)
- NodeJS and npm: https://nodejs.org/en/download

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
