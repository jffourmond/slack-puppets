# Slactor
Une appli web pour faire parler des slackbots

Par exemple : 
[George Abitbol : Si tu veux me parler, envoie-moi un... fax !](img/george.png)

## Technologies utilisées
 
* JavaScript
* AngularJS 1.4
* Node.js
* Bootstrap 3
* HTML 5
* CSS 3
* Docker

## Lancer l'appli avec Docker 

1. git clone https://github.com/jffourmond/slactor.git
2. cd slactor
3. Editer le fichier server.js et modifier les valeurs suivantes : 
  1. TMP_TOKEN : le jeton de sécurité généré en bas de [cette page](https://api.slack.com/web) pour la team Slack de votre choix. Ex : xoxb-123456789-ABlcDefghiJ2KlmnoP3KlM45
  2. TMP_PASSWORD : choisir un mot de passe simple pour éviter que tout le monde puisse poster des messages sur votre team Slack. Attention, l'appli n'est pas en HTTPS.
4. `docker build -t slactor .`
5. `sudo docker run -p 3000:3000 --name slactor -t slactor`

## Pour voir à quoi ressemble l'appli

Une instance l'application est déployée à cette adresse : http://slactor.jffourmond.com/