# Dockerfile for NestJS Backend with Prisma
FROM node:20.18.0-slim AS base
WORKDIR /app

# Stage 1: Install dependencies and build tools
FROM base AS build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    openssl \
    pkg-config \
    python-is-python3 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy package files
COPY package-lock.json package.json ./

# Copy prisma schema BEFORE npm install (needed for postinstall hook)
COPY prisma ./prisma/

# Install dependencies (this runs `npx prisma generate` via postinstall)
RUN npm ci --include=dev

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM base AS production
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy dependencies and built app from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/uploads ./uploads

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 5001

# Start the application
CMD ["npm", "run", "start:prod"]
