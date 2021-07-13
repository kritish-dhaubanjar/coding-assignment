FROM node:alpine

WORKDIR /server
COPY ["package.json", "yarn.lock", "./"]
RUN yarn
COPY ./ ./
CMD ["yarn", "dev"]
EXPOSE 8080