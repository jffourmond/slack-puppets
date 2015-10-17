
# Se base sur une image Ubuntu 14.04
FROM ubuntu:14.04

# Met a jour les packages linux
RUN apt-get -y update

# Installe Git, récupère les sources de l'appli et les copie dans le répertoire servi par Apache
RUN apt-get -y install git
RUN git clone https://github.com/jffourmond/slack-puppets.git
WORKDIR slack-puppets

# Installe Node.js, Express.js et ses modules
RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN npm install express --save
RUN npm install request --save
RUN npm install body-parser --save
RUN npm install moment --save

# Lance Node.js au démarrage du container
CMD ["nodejs", "server.js"]
