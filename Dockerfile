FROM node:slim

ARG MONGO_CONNECTION_STRING
ARG MONGO_AUTHENTICATION_DATABASE
ARG COOKIE_SECRET
ARG PORT

ENV MONGO_CONNECTION_STRING $MONGO_CONNECTION_STRING
ENV MONGO_AUTHENTICATION_DATABASE $MONGO_AUTHENTICATION_DATABASE
ENV COOKIE_SECRET $COOKIE_SECRET
ENV PORT $PORT

WORKDIR /app
COPY package*.json ./
# RUN rm -rf node_modules
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python
RUN npm install
# RUN yarn cache clean
# RUN yarn run build
COPY . .

EXPOSE $PORT
CMD ["npm", "start"]

# sh -c 'apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install'