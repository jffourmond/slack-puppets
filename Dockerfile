FROM node:6.11

RUN mkdir -p /docker/slactor
COPY . /docker/slactor/
WORKDIR /docker/slactor

RUN npm install 
RUN npm install browserify -g

RUN date > client/version.txt
RUN npm run build
RUN npm run storybook-export

CMD [ "npm", "start" ]
