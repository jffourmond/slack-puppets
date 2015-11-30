'use strict';

//import { SlactorService } from 'js/SlactorService.js';

const SAISIE = 1;
const ENVOI = 2;
const OK = 3;
const KO = 4;

class SlactorController {

     constructor(SlactorService){
       this.SlactorService = SlactorService;
       this.token = 'xoxb-10286813046-VjlNLkHvqnpL0CeozQ3Lxa40';
       this.statut = undefined;

       this.passerEnModeSaisie();
     }

    isStatutEnvoi() {
      return this.statut === ENVOI;
    };

    isStatutOK(){
      return this.statut === OK;
    };

    isStatutKO(){
      return this.statut === KO;
    };

    setStatut(statut){
      this.statut = statut;
    }

    passerEnModeSaisie(){
       if (this.isStatutOK() || this.isStatutKO()){
         this.text = undefined;
       }
       this.setStatut(SAISIE);
    };

    posterMessage() {
        this.setStatut(ENVOI);
        var controller = this;
        this.SlactorService.posterMessage(this.token, this.channel, this.username, this.iconUrl, this.text).
        then(function success(response){
           controller.setStatut(OK);
        }, function error(response){
           controller.setStatut(KO);
           controller.errorMessage = response.data;
        });
    };
}

app.controller('SlactorController', ['SlactorService', SlactorService => new SlactorController(SlactorService)]); 

//export { SlactorController };
