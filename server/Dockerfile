FROM node:14
ENV MONGO_DB_URL mongodb+srv://dcbadmin:<password>@dcbcluster-hdxur.mongodb.net/test?retryWrites=true&w=majority
ENV PORT 1337
ENV NODE_ENV production
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node index.js
EXPOSE ${PORT}