# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

# Stage 2: Production environment with Caddy (used as artifact carrier)
FROM caddy:2-alpine

ARG PORT=4000
ENV PORT=$PORT

# Copy built files
COPY --from=build /app/dist /usr/share/caddy

# Generate Caddyfile for local testing
RUN printf ":${PORT} {\n\
    root * /usr/share/caddy\n\
    encode gzip\n\
    file_server\n\
    try_files {path} /index.html\n\
    header {\n\
        X-Content-Type-Options nosniff\n\
        X-Frame-Options DENY\n\
        Referrer-Policy no-referrer-when-downgrade\n\
    }\n\
}\n" > /etc/caddy/Caddyfile

EXPOSE $PORT

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
