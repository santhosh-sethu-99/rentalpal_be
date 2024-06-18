# Install dependencies only when needed
FROM node:18-alpine AS release

WORKDIR /swarajability-api
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn set version latest
COPY . .

RUN yarn install