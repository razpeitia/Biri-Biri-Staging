FROM node:12

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "login.js" ]