FROM python:3-alpine

WORKDIR /app

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