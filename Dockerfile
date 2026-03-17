FROM alpine:latest

RUN apk update && apk upgrade \
    && apk add --no-cache nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/portfolio/browser/ /usr/share/nginx/html/
COPY src/sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY src/robots.txt /usr/share/nginx/html/robots.txt

RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]