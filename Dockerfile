FROM node:slim

ARG MONGO_STRING
ARG MONG_AUTH_DB
ARG SECRET
ARG PORT=80

ENV MONGO_STRING=${MONGO_STRING}
ENV MONGO_AUTH_DB=${MONGO_AUTH_DB}
ENV SECRET=${SECRET}
ENV PORT=${PORT}

WORKDIR /app
COPY package*.json ./

RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python
RUN apt-get install -y iputils-ping
RUN npm install

COPY . .

EXPOSE ${PORT}
CMD ["npm", "start"]