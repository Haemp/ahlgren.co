FROM node:6
# replace this with your application's default port
EXPOSE 1337

RUN ls
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm start
