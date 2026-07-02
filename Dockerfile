FROM alpine:latest AS clone-project

WORKDIR /source
RUN apk add git
RUN git clone https://github.com/muhammadwahyupratama/koda-b8-react .

FROM node:alpine AS build-project

WORKDIR /app
COPY --from=clone-project /source/ .
RUN npm i
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=build-project /app/dist/ .
COPY --from=build-project /app/nginx.conf /etc/nginx/conf.d/default.conf