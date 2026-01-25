FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/portfolio/browser /usr/share/nginx/html
COPY src/sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY src/robots.txt /usr/share/nginx/html/robots.txt
