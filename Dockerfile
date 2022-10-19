FROM node:alpine AS builder

ENV NODE_ENV production
ENV NODE_OPTIONS --openssl-legacy-provider

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm config set unsafe-perm true
RUN npm install --production
COPY . .

RUN npm run build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80