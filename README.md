## Coding Assignment [Express, DynamoDB, Redis]

## Description
Create a Restful API for CRUD application using expressJs framework that has
following features.

- Logged in users can create, delete and update their article.
- Public user can read the article.

**It should show the following implementation:**

- Run in multi thread of CPU.
- Caching and cache invalidation using Redis.
- Implement Oauth with JWT.
- Use local dynamodb.
- Use ES6 and async await.

**Notes:**

- Should share code in github with proper commits history.
- Should have a readme.md file with instruction to run in other computer.
- Should share a migration script for dynamodb such that the tables can be created in other hosts.

## Development Setup
1. [Setup Node Server](server)
2. [Setup React App](app)

## Deployment Setup with Docker
1. Clone Repository
2. Configure `.env` in `app` & `server`.
3. Build and run application with `docker-compose up`.

![image](https://user-images.githubusercontent.com/25634165/125441365-4440d190-56c3-44af-86da-a49bc2645d10.png)

![image](https://user-images.githubusercontent.com/25634165/125441658-83541d9a-1d87-4ab8-a3f6-38c3a407f780.png)

4. Change the permissions of `docker/dynamodb` volume. `eg: chmod -R 777 docker/dynamodb`.
5. Manually run the migration with:
```
docker exec -it <codeassignment:server container id> sh
npm run migrate --dir=src
```

## Deployment Setup with Docker (Production)
1. Clone Repository
2. Configure `.env` in `app` & `server`.
3. Build and run application with `docker-compose -f ./docker-compose.prod.yml up`.
4. Change the permissions of `docker/dynamodb` volume. `eg: chmod -R 777 docker/dynamodb`.
5. Manually run the migration with:
```
docker exec -it <codeassignment:server container id> sh
npm run migrate --dir=dist
```
