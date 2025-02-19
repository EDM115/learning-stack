#!/bin/bash
set -e
set -u

BACKEND_URL="http://localhost:${BACKEND_PORT}"

echo "Starting backend on port ${BACKEND_PORT}..."
(cd backend && npm run start) &

echo "Starting frontend on port ${FRONTEND_PORT}..."
(cd frontend && PORT=${FRONTEND_PORT} NEXT_PUBLIC_BACKEND_URL=${BACKEND_URL} npm run start) &

wait
