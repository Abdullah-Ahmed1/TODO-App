FROM node:alpine

WORKDIR /frontend

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 5173 

CMD ["npm", "run", "dev"]