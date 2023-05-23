FROM python:3-alpine

# set working directory
WORKDIR /app

# # set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# # install system dependencies
# RUN apt-get update \
#   && apt-get -y install netcat gcc postgresql \
#   && apt-get clean

# add and install requirements
COPY ./requirements.txt .
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

# add app
COPY . .

CMD ["flask", "run", "--host=0.0.0.0"]
# cd backend
# docker build -t flask-backend ./
# docker run -d --name flask-backend-container -p 5000:5000 flask-backend