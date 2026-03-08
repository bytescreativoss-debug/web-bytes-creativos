FROM node:18
WORKDIR /app
COPY . .
RUN cd backend && npm install
RUN cd frontend && npm install
RUN cd frontend && NODE_OPTIONS=--max-old-space-size=2048 npm run build
EXPOSE 5000
CMD ["node", "backend/server.js"]
