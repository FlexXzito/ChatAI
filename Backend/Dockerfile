FROM node
WORKDIR /PsicologiaBackend
COPY package.json .
RUN npm install
COPY . .
CMD ["npx prisma generate", "npx prisma migrate deploy", "npm start"]
