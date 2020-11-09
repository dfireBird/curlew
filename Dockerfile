FROM node:alpine

WORKDIR /usr/api

COPY package.json yarn.lock ./
RUN yarn

COPY . .

CMD yarn start
