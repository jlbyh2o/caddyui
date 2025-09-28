FROM node:22
USER node
WORKDIR /usr/app
COPY --chown=node:node [^.dD]* /usr/app
RUN npm install
RUN npm run build
COPY --link docker-entrypoint.sh /
ENV NEXT_TELEMETRY_DISABLED=1
ENTRYPOINT ["/docker-entrypoint.sh"]
