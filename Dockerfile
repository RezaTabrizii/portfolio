# syntax=docker/dockerfile:1.7

# ---- Build: prerender the site to static files ----------------------------
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
# Scripts are skipped here (postinstall runs `nuxt prepare`, which needs the sources); `nuxt generate` prepares itself.
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

COPY . .
# Optional absolute origin for canonical/OG tags, e.g. https://example.com
ARG NUXT_PUBLIC_SITE_URL=""
ENV NUXT_PUBLIC_SITE_URL=${NUXT_PUBLIC_SITE_URL}
RUN pnpm generate

# ---- Runtime: unprivileged Nginx serving .output/public --------------------
FROM nginxinc/nginx-unprivileged:1.28-alpine AS runtime
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/.output/public /usr/share/nginx/html

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
