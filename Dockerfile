FROM alpine:latest AS clone-project

WORKDIR /source
RUN apk add git
RUN git clone https://github.com/muhammadwahyupratamaa/koda-b8-react .

FROM node:alpine AS build-project

WORKDIR /app
COPY --from=clone-project /source/ .
RUN npm i
ARG VITE_API_URL=http://localhost:8081
ARG VITE_WS_URL=ws://localhost:8081

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_WS_URL=$VITE_WS_URL

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=build-project /app/dist/ .
COPY --from=build-project /app/nginx.conf /etc/nginx/conf.d/default.conf