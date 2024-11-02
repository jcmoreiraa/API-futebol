#!/bin/sh
set -e

echo "Iniciando o seed..."
npx ts-node prisma/seed.ts

echo "Iniciando o servidor..."
exec npx ts-node src/server.ts
