import React from 'react';
import SlactorInput from './SlactorInput.jsx';
import SlactorStatus from './SlactorStatus.jsx';
import { SAISIE, OK, KO } from './constants.js';

export default class SlactorForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChannelChange = this.handleChannelChange.bind(this);
        this.handleBotNameChange = this.handleBotNameChange.bind(this);
        this.handleIconUrlChange = this.handleIconUrlChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageFocus = this.handleMessageFocus.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        
        this.state = {
            status: SAISIE
        };
    }

    handleChannelChange(channel) {
        this.setState({ channel: channel.target.value });
    }

    handleBotNameChange(botName) {
        this.setState({ botName: botName.target.value });
    }

    handleIconUrlChange(iconUrl) {
        this.setState({ iconUrl: iconUrl.target.value });
    }

    handleMessageChange(message) {
        this.setState({ message: message.target.value });
    }

    handlePasswordChange(password) {
        this.setState({ password: password.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const payload = JSON.stringify(this.state);
        console.log("payload : " + payload);

        const form = this;
        return $.ajax({
            type: "POST",
            url: "/messages",
            data: payload,
            contentType: "application/json; charset=utf-8"
        }).done(function (response) {
            console.log("OK " + response);
            form.setState({ status: OK });
        }).fail(function (jqXHR) {
            console.log("KO " + jqXHR.responseText);
            form.setState({ status: KO, error: jqXHR.responseText });
        });
    }

    handleInputFocus(){
        if (this.state.status === OK || this.state.status === KO) {
            this.setState({ status: SAISIE });
        }
    }

    handleMessageFocus(){

        this.handleInputFocus();

        if (this.state.status === OK) {
            this.setState({ message: '' });
        }        
    }

    render() {

        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-offset-2 col-lg-8 bloc-inputs">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>

                        <SlactorInput
                            id="channel"
                            label="Nom du salon"
                            placeholder="Exemple : #general"
                            value={this.state.channel}
                            onChange={this.handleChannelChange}
                            onFocus={this.handleInputFocus}
                            required />
                        <SlactorInput
                            id="botName"
                            label="Pseudonyme du bot"
                            placeholder="Exemple : George Abitbol"
                            value={this.state.botName}
                            onChange={this.handleBotNameChange}
                            onFocus={this.handleInputFocus}
                            required />
                        <SlactorInput
                            id="iconUrl"
                            label="URL de l'image du bot"
                            placeholder="URL de l'image de l'avatar du bot"
                            value={this.state.iconUrl}
                            onChange={this.handleIconUrlChange}
                            onFocus={this.handleInputFocus}
                            />
                        <SlactorInput
                            id="text"
                            label="Message"
                            placeholder="Tapez ici le message à envoyer..."
                            value={this.state.message}
                            onChange={this.handleMessageChange}
                            onFocus={this.handleMessageFocus}
                            required />
                        <SlactorInput
                            id="password"
                            label="Mot de passe"
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            onFocus={this.handleInputFocus}
                            required />

                        <div className="form-group">
                            <div className="col-lg-offset-3 col-lg-9">
                                <input type="submit" className="btn btn-default" value="Envoyer"/>
                                <SlactorStatus status={this.state.status} error={this.state.error}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};