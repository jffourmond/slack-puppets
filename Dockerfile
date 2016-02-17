# Se base sur une image NodeJS 5
FROM node:5-slim

RUN mkdir -p /docker/slactor
COPY . /docker/slactor/
WORKDIR /docker/slactor
#--no-bin-links nécessaire sous Windows
RUN npm install --no-bin-links 

CMD [ "npm", "start" ]