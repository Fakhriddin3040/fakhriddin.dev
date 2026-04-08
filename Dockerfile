FROM node:22.12.0-alpine AS build

WORKDIR /app

COPY package*.json .

RUN --mount=type=cache,target=/root/.npm npm i 

COPY . .

RUN --mount=type=cache,target=/root/.build npm run build

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/fakhriddin-io/* /usr/share/nginx/html


