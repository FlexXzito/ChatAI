FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
# RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD ["npm", "start"]