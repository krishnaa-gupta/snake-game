FROM nginx:alpine

COPY App/ /usr/share/nginx/html/

EXPOSE 80