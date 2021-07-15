FROM nginx

COPY index.html heroes.js ajax.css /usr/share/nginx/html/
EXPOSE 80