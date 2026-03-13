FROM node:18
WORKDIR /app
COPY . .

# 1. Entramos a backend e instalamos el motor
RUN cd backend && npm install

# 2. Entramos a frontend, instalamos y fabricamos la web
RUN cd frontend && npm install && npm run build

# EXTREMADAMENTE IMPORTANTE: Koyeb busca el puerto 5000 según tu configuración
EXPOSE 5000

# El comando final para arrancar la agencia usando el puerto correcto
CMD ["node", "backend/server.js"]