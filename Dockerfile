FROM node:23-alpine3.21

LABEL org.opencontainers.image.authors="EDM115 <dev@edm115.dev>"
LABEL org.opencontainers.image.base.name="node:23-alpine3.21"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.source="https://github.com/EDM115/learning-stack.git"
LABEL org.opencontainers.image.title="TrackFit"
LABEL org.opencontainers.image.url="https://github.com/EDM115/learning-stack.git"

ENV BACKEND_PORT=56001
ENV FRONTEND_PORT=56000
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

WORKDIR /app/

COPY . /app/

RUN apk update && \
  apk upgrade --no-cache && \
  apk add --no-cache bash>=5.2.37-r0 git>=2.47.2-r0

WORKDIR /app/backend/
RUN npm run i && npm run build

WORKDIR /app/frontend/
RUN npm run i && NODE_ENV=production npm run build

EXPOSE 56001
EXPOSE 56000

WORKDIR /app/
ENV NODE_ENV=production
RUN chmod +x start.sh

ENTRYPOINT ["/bin/bash", "start.sh"]
