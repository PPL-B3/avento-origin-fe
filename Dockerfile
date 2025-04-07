# Base stage to define common variables
FROM node:18-alpine AS base

# Define build args
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_API_URL
ARG LOGROCKET_ID

# Convert build args to environment variables
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV LOGROCKET_ID=$LOGROCKET_ID

# Builder stage
FROM base AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.15.4

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --ignore-scripts

# Copy app files
COPY next.config.ts tsconfig.json tailwind.config.ts components.json postcss.config.mjs ./
COPY public ./public
COPY src ./src

# Build the app
RUN pnpm build

# Runner stage
FROM base AS runner

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.15.4

# Copy production dependencies and built app
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install production dependencies
RUN pnpm install --prod --ignore-scripts

# Expose the port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]