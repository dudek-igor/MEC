# Common build stage
FROM node:16-alpine3.13 as common-build-stage

RUN rm -rf ./app

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3000

# Production build stage for docker compose
FROM common-build-stage as docker-build-stage

ENV NODE_ENV production

ENV DOCKER_COMPOSE true

RUN npm install --prefix client && npm run build --prefix client

RUN npm run build

CMD ["npm", "run", "start"]

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage for Heroku
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

ENV HEROKU true

RUN npm install --prefix client && npm run build --prefix client

RUN npm run build

CMD ["npm", "run", "start"]