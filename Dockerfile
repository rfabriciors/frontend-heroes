FROM nginx

COPY index.html heroes.js estilo.css /usr/share/nginx/html/
EXPOSE 80