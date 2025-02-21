FROM node:23-alpine3.21

LABEL org.opencontainers.image.authors="EDM115 <dev@edm115.dev>"
LABEL org.opencontainers.image.base.name="node:23-alpine3.21"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.source="https://github.com/EDM115/learning-stack.git"
LABEL org.opencontainers.image.title="TrackFit"
LABEL org.opencontainers.image.url="https://github.com/EDM115/learning-stack.git"

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB
ARG POSTGRES_URL

ENV BACKEND_PORT=56001
ENV FRONTEND_PORT=56000
ENV NEXT_TELEMETRY_DISABLED=1
ENV POSTGRES_URL=${POSTGRES_URL}
# Workaround for NPM not installing dev dependencies
ENV NODE_ENV=development

WORKDIR /app/

COPY . /app/

RUN apk update && \
  apk upgrade --no-cache && \
  apk add --no-cache bash>=5.2.37-r0 git>=2.47.2-r0 postgresql17>=17.2-r0 && \
  apk add --no-cache gosu>=1.17-r6 --repository=https://dl-cdn.alpinelinux.org/alpine/edge/testing && \
  mkdir /run/postgresql && mkdir -p /var/lib/postgresql/data && \
  chown postgres:postgres /run/postgresql && \
  chown -R postgres:postgres /var/lib/postgresql && \
  chmod 700 /var/lib/postgresql/data

USER postgres

RUN /usr/bin/initdb -D /var/lib/postgresql/data && \
    echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf && \
    echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf && \
    /usr/bin/pg_ctl -D /var/lib/postgresql/data start && \
    psql -c "ALTER USER ${POSTGRES_USER} WITH PASSWORD '${POSTGRES_PASSWORD}';" && \
    createdb ${POSTGRES_DB} && \
    /usr/bin/pg_ctl -D /var/lib/postgresql/data stop

USER root

RUN chown -R node:node /app

USER node

WORKDIR /app/backend/

RUN npm run i && npm run build

WORKDIR /app/frontend/

RUN npm run i && NODE_ENV=production npm run build

EXPOSE 56001
EXPOSE 56000
EXPOSE 5432

WORKDIR /app/

ENV NODE_ENV=production

RUN chmod +x start.sh

USER root

ENTRYPOINT ["/bin/bash", "start.sh"]
