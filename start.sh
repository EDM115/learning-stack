#!/bin/bash
set -e
set -u

gosu postgres /usr/bin/pg_ctl -D /var/lib/postgresql/data start

BACKEND_URL="http://localhost:${BACKEND_PORT}"

check_db_initialized() {
  gosu postgres psql -U $POSTGRES_USER -d $POSTGRES_DB -tAc "SELECT 1 FROM information_schema.tables WHERE table_name = 'Goal'" | grep -q 1
}

if ! check_db_initialized; then
  cd backend
  npm run prisma:deploy
  npm run prisma:seed
  cd ..
fi

echo "Starting backend on port ${BACKEND_PORT}..."
(cd backend && npm run start) &

echo "Starting frontend on port ${FRONTEND_PORT}..."
(cd frontend && PORT=${FRONTEND_PORT} NEXT_PUBLIC_BACKEND_URL=${BACKEND_URL} npm run start) &

wait
