FROM node:22

# Set up environment
USER node
WORKDIR /usr/app
COPY --chown=node:node package* /usr/app
RUN npm install
COPY --chown=node:node [^.dD]* /usr/app

# Build
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build
COPY --link docker-entrypoint.sh /

# Run
ENTRYPOINT ["/docker-entrypoint.sh"]
