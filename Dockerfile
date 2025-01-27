# FROM node:18-alpine
FROM node:18-alpine AS base
WORKDIR /work/project
COPY package* ./
RUN npm install

FROM base AS development
WORKDIR /work/project
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS production
WORKDIR /work/project
COPY . .
RUN npm run build
RUN npm prune --production
EXPOSE 3000
CMD ["npm","start"]
