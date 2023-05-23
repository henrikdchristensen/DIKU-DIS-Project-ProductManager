FROM postgres
ENV POSTGRES_PASSWORD 123456
ENV POSTGRES_DB dis
ADD database.sql /docker-entrypoint-initdb.d/
# cd database
# docker build -t postgres-db ./
# docker run -d --name postgresdb-container -p 5001:5432 postgres-db
