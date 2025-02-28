FROM node:18

WORKDIR /MESSAGE_BROKER_VOTING
COPY package.json package-lock.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["yarn", "start"]
