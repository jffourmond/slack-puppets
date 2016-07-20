const SAISIE = 1;
const ENVOI = 2;
const OK = 3;
const KO = 4;

const SlactorInput = React.createClass({

  render: function () {

    const inputClass = "form-group " + (this.props.required === true ? 'required' : '');
    return (
      <div className={inputClass}>
        <label htmlFor={this.props.id} className="col-lg-3 control-label">{this.props.label}</label>
        <div className="col-lg-9">
          <input className="form-control"
            id={this.props.id}
            name={this.props.id}
            placeholder={this.props.placeholder}
            required={this.props.required}
            onFocus={this.props.onFocus}
            onChange={this.props.onChange}
            onReset={this.props.onReset}
            />
        </div>
      </div>
    );
  }
});

const SlactorForm = React.createClass({
  getInitialState: function () {
    return {
      statut: SAISIE
    }
  },
  handleChannelChange: function (channel) {
    this.setState({ channel: channel.target.value });
  },
  handleBotNameChange: function (botName) {
    this.setState({ botName: botName.target.value });
  },
  handleIconUrlChange: function (iconUrl) {
    this.setState({ iconUrl: iconUrl.target.value });
  },
  handleMessageChange: function (message) {
    this.setState({ message: message.target.value });
  },
  handlePasswordChange: function (password) {
    this.setState({ password: password.target.value });
  },

  handleSubmit: function (e) {
    e.preventDefault();
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
      form.setState({ statut: OK });
    }).fail(function (jqXHR) {
      console.log("KO " + jqXHR.responseText);
      form.setState({ statut: KO, error: jqXHR.responseText });
    });
  },

  passerEnModeSaisie: function () {
    console.log(" mode saisie");
    if (this.state.statut === OK || this.state.statut === KO) {
      console.log(" mode saisie Reset");
      this.setState({ statut: SAISIE, message: undefined });
    }
  },

  render: function () {
    console.log("statut: " + this.state.statut);

    var imageStatut = null;
    if (this.state.statut === ENVOI) {
      imageStatut = <span>
        <img src="img/loading.gif" alt="Loading..." />
      </span>
    } else if (this.state.statut === OK) {
      imageStatut = <span>
        <img src="img/OK.png" alt="Message sent." />
        <span className="success">Message envoyé</span>
      </span>
    } else if (this.state.statut === KO) {
      imageStatut = <span>
        <img src="img/KO.png" alt="Message not sent." />
        <span className="error">{this.state.error}</span>
      </span>
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-offset-2 col-lg-8 bloc-inputs">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>

            <SlactorInput
              id="channel"
              label="Nom du salon"
              placeholder="Exemple : #general"
              onChange={this.handleChannelChange}
              required />
            <SlactorInput
              id="botName"
              label="Pseudonyme du bot"
              placeholder="Exemple : George Abitbol"
              onChange={this.handleBotNameChange}
              required />
            <SlactorInput
              id="iconUrl"
              label="URL de l'image du bot"
              placeholder="URL de l'image de l'avatar du bot"
              onChange={this.handleIconUrlChange}
              />
            <SlactorInput
              id="text"
              label="Message"
              placeholder="Tapez ici le message à envoyer..."
              onChange={this.handleMessageChange}
              required />
            <SlactorInput
              id="password"
              label="Mot de passe"
              onChange={this.handlePasswordChange}
              required />

            <div className="form-group">
              <div className="col-lg-offset-3 col-lg-9">
                <input type="submit" className="btn btn-default" value="Envoyer"/>
                {imageStatut}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <SlactorForm />,
  document.getElementById('content')
);
