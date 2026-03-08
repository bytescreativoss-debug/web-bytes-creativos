FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN cd frontend && npm install && npm run build
EXPOSE 8000
CMD ["node", "backend/server.js"]