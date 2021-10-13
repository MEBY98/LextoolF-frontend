FROM node:14-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install --silent
COPY . .
RUN npm run build
#NGINX
CMD []