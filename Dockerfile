FROM node:6.2.2

RUN mkdir -p /docker/slactor
COPY . /docker/slactor/
WORKDIR /docker/slactor
#--no-bin-links nécessaire sous Windows
RUN npm install --no-bin-links 
RUN npm install browserify -g
RUN npm run build
RUN npm run storybook-export

CMD [ "npm", "start" ]
