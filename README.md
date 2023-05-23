# Project Introduction

The application allows a company to view their product-templates and the produced products which is based on a product-template.
When clicking on a product-template; parameters, journal and all the produced products of that specific template will be shown.

It is possible to sort the table by clicking on the column headers and it is also possible to search for a specific entry for the selected column in the search bar.

Since the table can contain a lot of entries, a number of entries is fetched when reaching the bottom of the table. This is done to improve responsiveness of the web application.

The project consist of a database (PostgreSQL), a backend (Flask) and a frontend (React). All three are running on their own server.

The backend is responsible for handling the requests from the frontend and communicating with the database. The frontend is responsible for displaying the data from the backend and sending requests to the backend.

To access the web application, the user must access the frontend server (port 3000).

The PostgreSQL database consist of 8 tables and the relations between them are shown the diagram 'docs/ER-diagram.png'.

# Project Setup

Two options are available for running the project:

1. Using Docker, see section 'Using Docker (Recommended)'
2. Install required software manually, see section 'Without using Docker (Not recommended)'

The recommended option is to use docker, since it requires less setup.

## Using Docker (Recommended)

### Software Requirements

- Docker Desktop: https://docs.docker.com/get-docker/

### Running the Project

1. Run the following command in root folder:

   `docker-compose up`

2. The web application can now be accessed on:

   http://localhost:3000

## Without using Docker (Not recommended)

If not using docker, the following changes must be made:

In `frontend\package.json` set proxy to "http://127.0.0.1:5000"
And in `backend\backend.py` set host to "localhost"

### Software Requirements

- PostgreSQL and pgAdmin: https://www.postgresql.org/download/
- Python 3.8 and newer.
- Optional: Package manager for Python (pip, conda, etc.)
- NodeJS and npm: https://nodejs.org/en/download

### Database Setup

To create the database, a script is created (`database/database.sql`):

1. Log in with privliges to create a database (e.g. postgres):

   `psql -U postgres`

2. Create the database called 'dis':

   `CREATE DATABASE dis;`

3. Enter the new database:

   `\c dis`

4. Run the script:

   `\i database.sql`

### Backend Setup

If you are using a package manager, it is recommended to create a virtual environment for the project, e.g. using conda:

1. Create a new environment:

   `conda create --name dis python=3.11`

2. Activate the environment:

   `conda activate dis`

3. Install pip into conda environment:

   `conda install pip`

4. Enter the backend folder:

   `cd backend`

5. Install the required packages:

   `pip install -r requirements.txt`

6. Run the following command to start the backend server:

   `python backend.py`

### Frontend Setup

1. Enter the frontend folder:

   `cd frontend`

2. Install the required packages using:

   `npm install`

3. Run the following command to start the frontend server:

   `npm start`

4. You can now access the web application on:

   http://localhost:3000
