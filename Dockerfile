FROM node:9.1

MAINTAINER Antoine Gaillot

# Set homedir as env variable
ENV HOME_DIR /app

# Create app directory
WORKDIR $HOME_DIR

RUN apt-get update
RUN apt-get upgrade -y
RUN yarn global add nodemon

# Install app dependencies
COPY package.json .
RUN yarn install

EXPOSE 3000

# Default CMD on run
CMD ["yarn", "serve:example"]
