FROM node:argon
# replace this with your application's default port
EXPOSE 1337

RUN ls
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "start"]
