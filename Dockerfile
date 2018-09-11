FROM node:8.11.2-alpine
LABEL maintainer="Rocket.Chat Team <buildmaster@rocket.chat>"

ENV npm_config_loglevel=error
ENV BOT_OWNER "No owner specified"
ENV BOT_DESC "bBot with the Rocket.Chat adapter"

USER root

COPY bin/bbot /home/bbot/bin/
COPY package.json /home/bbot/
COPY index.js /home/bbot/
COPY src/* /home/bbot/src/

RUN apk add --update --no-cache \
    git && \
    adduser -S bbot && \
    addgroup -S bbot && \
    touch ~/.bashrc && \
    npm install --global npm@latest && \
    chown -R bbot:bbot /home/bbot/

WORKDIR /home/bbot/

USER bbot

RUN npm install --no-audit

CMD ["/bin/ash", "/home/bbot/bin/bbot"]