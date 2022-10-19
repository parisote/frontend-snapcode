# Fetching the latest node image on apline linux
FROM node:alpine AS builder

# Declaring env
ENV NODE_ENV production
ENV NODE_OPTIONS --openssl-legacy-provider

# Setting up the work directory
WORKDIR /frontend-snapcode

# Installing dependencies
COPY ./package.json ./
RUN npm install

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY --from=builder /frontend-snapcode/build /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf