# STEP 1: Compile TS to JS 
FROM node:18 AS builder
WORKDIR /artwhale-server
COPY . .
RUN npm install
RUN npm run build

# STEP 2: Use alpine image
FROM node:18-alpine
WORKDIR /artwhale-server
ENV NODE_ENV production
COPY --from=builder /artwhale-server ./
CMD ["npm","run","start:prod"]