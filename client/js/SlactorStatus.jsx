import React from 'react';
import { ENVOI, OK, KO } from './constants.js';

export default class SlactorStatus extends React.Component {

  render() {

        /* l'image success/échec affichée après validation du formulaire */
        var imagestatus = null;
        if (this.props.status === ENVOI) {
            imagestatus = <span>
                <img src="img/loading.gif" alt="Loading..." />
            </span>
        } else if (this.props.status === OK) {
            imagestatus = <span>
                <img src="img/OK.png" alt="Message sent." />
                <span className="success">Message envoyé</span>
            </span>
        } else if (this.props.status === KO) {
            imagestatus = <span>
                <img src="img/KO.png" alt="Message not sent." />
                <span className="error">{this.props.error}</span>
            </span>
        }

        return imagestatus;

  }
}