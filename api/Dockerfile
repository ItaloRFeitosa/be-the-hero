FROM node:alpine

RUN apk --update add postgresql-client
RUN mkdir -p /usr/api

WORKDIR /usr/api

COPY . .

RUN npm install

EXPOSE 3333



