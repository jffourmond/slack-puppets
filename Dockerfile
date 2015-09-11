# Se base sur une image Ubuntu 14.04
FROM ubuntu:14.04

# Met a jour les packages linux
RUN apt-get update

# Installe Git, récupère les sources de l'appli et les copie dans le répertoire servi par Apache
RUN apt-get -y install git
RUN git clone https://github.com/jffourmond/slack-puppets.git
RUN cp -r slack-puppets/* /var/www/html

# Installe Node.js, Express.js et ses modules
sudo npm install express --save
sudo npm install request --save
sudo npm install body-parser --save

EXPOSE 3000

# Lance Apache au démarrage du container
CMD ["nodejs", "server.js"]
