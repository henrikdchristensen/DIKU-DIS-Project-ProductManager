# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# start app
CMD ["npm", "start"]

# cd frontend
# docker build -t react-frontend ./
# docker run -d --name react-frontend-container -p 3000:3000 react-frontend