FROM node:10.16

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "login.js" ]
