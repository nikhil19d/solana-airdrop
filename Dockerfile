# FROM node:18-alpine
FROM node:18-alpine AS base
WORKDIR /image
COPY package* ./
RUN npm install

FROM base AS development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS production
COPY . .
RUN npm run build
RUN npm prune --production
EXPOSE 3000
CMD ["npm","start"]
