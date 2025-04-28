FROM dockerhub.hilton.com/nginx:stable
RUN mkdir -p /usr/share/nginx/html/

COPY  ./static/js/ /usr/share/nginx/html/
COPY  ./static/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY template-env.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/template-env.sh

EXPOSE 3000