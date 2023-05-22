FROM node:alpine

WORKDIR /backend

COPY package*.json /backend/

RUN npm install --force

COPY . .

EXPOSE 5000

CMD ["npm","start"]