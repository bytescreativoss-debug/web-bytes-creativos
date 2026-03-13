FROM node:18
WORKDIR /app
COPY . .

# 1. Entramos a backend e instalamos el motor
RUN cd backend && npm install

# 2. Entramos a frontend, instalamos con bypass de conflictos y fabricamos la web
# Agregamos --legacy-peer-deps para solucionar el error de la captura
RUN cd frontend && npm install --legacy-peer-deps && npm run build

# EXTREMADAMENTE IMPORTANTE: Puerto sincronizado con server.js
EXPOSE 5000

# Comando de arranque
CMD ["node", "backend/server.js"]