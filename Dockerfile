FROM node:14-alpine  as build
ENV http_proxy http://192.168.205.251:3128
ENV https_proxy http://192.168.205.251:3128
WORKDIR /app
COPY ./package.json ./
RUN npm install --silent
COPY . .
RUN npm run build
### STAGE 2: Production Environment ###
FROM nginx:1.19.8-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]