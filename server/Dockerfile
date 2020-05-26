FROM node:14
ENV MONGO_DB_URL <Your MongoDb Connection URL>
ENV PORT 5000
ENV NODE_ENV production
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node src/index.js
EXPOSE ${PORT}