# Static client site — copy the whole project into nginx html root.
# Build from the client project directory (context = site root).
FROM nginx:1.27-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

# Drop packaging files from the public tree
RUN rm -rf /usr/share/nginx/html/docker \
           /usr/share/nginx/html/.git \
           /usr/share/nginx/html/.env \
           /usr/share/nginx/html/*.md \
           /usr/share/nginx/html/CLIENT-BRIEF.md \
           /usr/share/nginx/html/CHECKLIST.md \
           /usr/share/nginx/html/HANDOFF* \
  || true

HEALTHCHECK --interval=15s --timeout=5s --retries=5 \
  CMD wget -qO- http://127.0.0.1/health || exit 1

EXPOSE 80
