FROM node:20-alpine3.17

RUN mkdir -p /usr/src/app/ && apk update && apk add vim

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

RUN npm i

CMD ["npm", "run dev"]
