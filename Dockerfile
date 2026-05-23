FROM node:18-alpine
WORKDIR /app

# Copiar e instalar backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

# Copiar e instalar y buildear frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install --legacy-peer-deps
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Copiar el resto del backend
COPY backend/ ./backend/

EXPOSE 5000

CMD ["node", "backend/server.js"]