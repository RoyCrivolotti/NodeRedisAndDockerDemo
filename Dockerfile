FROM node:10

LABEL MAINTEINER="Roy Crivolotti"

ENV PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN apt-get update
RUN apt-get install curl -y

COPY . .

EXPOSE $PORT

CMD ["npm", "start"]
