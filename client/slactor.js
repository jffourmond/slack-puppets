(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SlactorInput = require("./SlactorInput.jsx");

var _SlactorInput2 = _interopRequireDefault(_SlactorInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SAISIE = 1;
var ENVOI = 2;
var OK = 3;
var KO = 4;

var SlactorForm = function (_React$Component) {
    _inherits(SlactorForm, _React$Component);

    function SlactorForm(props) {
        _classCallCheck(this, SlactorForm);

        var _this = _possibleConstructorReturn(this, (SlactorForm.__proto__ || Object.getPrototypeOf(SlactorForm)).call(this, props));

        _this.handleChannelChange = _this.handleChannelChange.bind(_this);
        _this.handleBotNameChange = _this.handleBotNameChange.bind(_this);
        _this.handleIconUrlChange = _this.handleIconUrlChange.bind(_this);
        _this.handleMessageChange = _this.handleMessageChange.bind(_this);
        _this.handleMessageFocus = _this.handleMessageFocus.bind(_this);
        _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleInputFocus = _this.handleInputFocus.bind(_this);

        _this.state = {
            statut: SAISIE
        };
        return _this;
    }

    _createClass(SlactorForm, [{
        key: "handleChannelChange",
        value: function handleChannelChange(channel) {
            this.setState({ channel: channel.target.value });
        }
    }, {
        key: "handleBotNameChange",
        value: function handleBotNameChange(botName) {
            this.setState({ botName: botName.target.value });
        }
    }, {
        key: "handleIconUrlChange",
        value: function handleIconUrlChange(iconUrl) {
            this.setState({ iconUrl: iconUrl.target.value });
        }
    }, {
        key: "handleMessageChange",
        value: function handleMessageChange(message) {
            this.setState({ message: message.target.value });
        }
    }, {
        key: "handlePasswordChange",
        value: function handlePasswordChange(password) {
            this.setState({ password: password.target.value });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            event.preventDefault();
            var payload = JSON.stringify(this.state);
            console.log("payload : " + payload);

            var form = this;
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
        }
    }, {
        key: "handleInputFocus",
        value: function handleInputFocus() {
            if (this.state.statut === OK || this.state.statut === KO) {
                this.setState({ statut: SAISIE });
            }
        }
    }, {
        key: "handleMessageFocus",
        value: function handleMessageFocus() {

            this.handleInputFocus();

            if (this.state.statut === OK) {
                this.setState({ message: '' });
            }
        }
    }, {
        key: "render",
        value: function render() {

            /* l'image success/échec affichée après envoi du message */
            var imageStatut = null;
            if (this.state.statut === ENVOI) {
                imageStatut = React.createElement(
                    "span",
                    null,
                    React.createElement("img", { src: "img/loading.gif", alt: "Loading..." })
                );
            } else if (this.state.statut === OK) {
                imageStatut = React.createElement(
                    "span",
                    null,
                    React.createElement("img", { src: "img/OK.png", alt: "Message sent." }),
                    React.createElement(
                        "span",
                        { className: "success" },
                        "Message envoy\xE9"
                    )
                );
            } else if (this.state.statut === KO) {
                imageStatut = React.createElement(
                    "span",
                    null,
                    React.createElement("img", { src: "img/KO.png", alt: "Message not sent." }),
                    React.createElement(
                        "span",
                        { className: "error" },
                        this.state.error
                    )
                );
            }

            return React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-12 col-md-12 col-lg-offset-2 col-lg-8 bloc-inputs" },
                    React.createElement(
                        "form",
                        { className: "form-horizontal", onSubmit: this.handleSubmit },
                        React.createElement(_SlactorInput2.default, {
                            id: "channel",
                            label: "Nom du salon",
                            placeholder: "Exemple : #general",
                            value: this.state.channel,
                            onChange: this.handleChannelChange,
                            onFocus: this.handleInputFocus,
                            required: true }),
                        React.createElement(_SlactorInput2.default, {
                            id: "botName",
                            label: "Pseudonyme du bot",
                            placeholder: "Exemple : George Abitbol",
                            value: this.state.botName,
                            onChange: this.handleBotNameChange,
                            onFocus: this.handleInputFocus,
                            required: true }),
                        React.createElement(_SlactorInput2.default, {
                            id: "iconUrl",
                            label: "URL de l'image du bot",
                            placeholder: "URL de l'image de l'avatar du bot",
                            value: this.state.iconUrl,
                            onChange: this.handleIconUrlChange,
                            onFocus: this.handleInputFocus
                        }),
                        React.createElement(_SlactorInput2.default, {
                            id: "text",
                            label: "Message",
                            placeholder: "Tapez ici le message \xE0 envoyer...",
                            value: this.state.message,
                            onChange: this.handleMessageChange,
                            onFocus: this.handleMessageFocus,
                            required: true }),
                        React.createElement(_SlactorInput2.default, {
                            id: "password",
                            label: "Mot de passe",
                            type: "password",
                            value: this.state.password,
                            onChange: this.handlePasswordChange,
                            onFocus: this.handleInputFocus,
                            required: true }),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-lg-offset-3 col-lg-9" },
                                React.createElement("input", { type: "submit", className: "btn btn-default", value: "Envoyer" }),
                                imageStatut
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SlactorForm;
}(React.Component);

exports.default = SlactorForm;
;

},{"./SlactorInput.jsx":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlactorInput = function (_React$Component) {
  _inherits(SlactorInput, _React$Component);

  function SlactorInput() {
    _classCallCheck(this, SlactorInput);

    return _possibleConstructorReturn(this, (SlactorInput.__proto__ || Object.getPrototypeOf(SlactorInput)).apply(this, arguments));
  }

  _createClass(SlactorInput, [{
    key: 'render',
    value: function render() {

      var type = this.props.type === 'password' ? 'password' : 'text';
      var value = this.props.value === undefined ? '' : this.props.value;
      var divClass = "form-group " + (this.props.required === true ? 'required' : '');

      return React.createElement(
        'div',
        { className: divClass },
        React.createElement(
          'label',
          { htmlFor: this.props.id, className: 'col-lg-3 control-label' },
          this.props.label
        ),
        React.createElement(
          'div',
          { className: 'col-lg-9' },
          React.createElement('input', { className: 'form-control',
            id: this.props.id,
            name: this.props.id,
            type: type,
            placeholder: this.props.placeholder,
            required: this.props.required,
            onFocus: this.props.onFocus,
            onChange: this.props.onChange,
            onReset: this.props.onReset,
            value: value
          })
        )
      );
    }
  }]);

  return SlactorInput;
}(React.Component);

exports.default = SlactorInput;
;

},{}],3:[function(require,module,exports){
'use strict';

var _SlactorForm = require('./SlactorForm.jsx');

var _SlactorForm2 = _interopRequireDefault(_SlactorForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(React.createElement(_SlactorForm2.default, null), document.getElementById('content'));

},{"./SlactorForm.jsx":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnRcXGpzXFxTbGFjdG9yRm9ybS5qc3giLCJjbGllbnRcXGpzXFxTbGFjdG9ySW5wdXQuanN4IiwiY2xpZW50XFxqc1xcY2xpZW50LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sU0FBUyxDQUFmO0FBQ0EsSUFBTSxRQUFRLENBQWQ7QUFDQSxJQUFNLEtBQUssQ0FBWDtBQUNBLElBQU0sS0FBSyxDQUFYOztJQUVxQixXOzs7QUFFakIseUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDhIQUNULEtBRFM7O0FBRWYsY0FBSyxtQkFBTCxHQUEyQixNQUFLLG1CQUFMLENBQXlCLElBQXpCLE9BQTNCO0FBQ0EsY0FBSyxtQkFBTCxHQUEyQixNQUFLLG1CQUFMLENBQXlCLElBQXpCLE9BQTNCO0FBQ0EsY0FBSyxtQkFBTCxHQUEyQixNQUFLLG1CQUFMLENBQXlCLElBQXpCLE9BQTNCO0FBQ0EsY0FBSyxtQkFBTCxHQUEyQixNQUFLLG1CQUFMLENBQXlCLElBQXpCLE9BQTNCO0FBQ0EsY0FBSyxrQkFBTCxHQUEwQixNQUFLLGtCQUFMLENBQXdCLElBQXhCLE9BQTFCO0FBQ0EsY0FBSyxvQkFBTCxHQUE0QixNQUFLLG9CQUFMLENBQTBCLElBQTFCLE9BQTVCO0FBQ0EsY0FBSyxZQUFMLEdBQW9CLE1BQUssWUFBTCxDQUFrQixJQUFsQixPQUFwQjtBQUNBLGNBQUssZ0JBQUwsR0FBd0IsTUFBSyxnQkFBTCxDQUFzQixJQUF0QixPQUF4Qjs7QUFFQSxjQUFLLEtBQUwsR0FBYTtBQUNULG9CQUFRO0FBREMsU0FBYjtBQVhlO0FBY2xCOzs7OzRDQUVtQixPLEVBQVM7QUFDekIsaUJBQUssUUFBTCxDQUFjLEVBQUUsU0FBUyxRQUFRLE1BQVIsQ0FBZSxLQUExQixFQUFkO0FBQ0g7Ozs0Q0FFbUIsTyxFQUFTO0FBQ3pC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Ozs7NkJBRVY7O0FBRVAsVUFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsS0FBb0IsVUFBcEIsR0FBaUMsVUFBakMsR0FBOEMsTUFBM0Q7QUFDQSxVQUFNLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixTQUFyQixHQUFpQyxFQUFqQyxHQUFzQyxLQUFLLEtBQUwsQ0FBVyxLQUEvRDtBQUNBLFVBQU0sV0FBVyxpQkFBaUIsS0FBSyxLQUFMLENBQVcsUUFBWCxLQUF3QixJQUF4QixHQUErQixVQUEvQixHQUE0QyxFQUE3RCxDQUFqQjs7QUFFQSxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVcsUUFBaEI7QUFDRTtBQUFBO0FBQUEsWUFBTyxTQUFTLEtBQUssS0FBTCxDQUFXLEVBQTNCLEVBQStCLFdBQVUsd0JBQXpDO0FBQW1FLGVBQUssS0FBTCxDQUFXO0FBQTlFLFNBREY7QUFFRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFVBQWY7QUFDRSx5Q0FBTyxXQUFVLGNBQWpCO0FBQ0UsZ0JBQUksS0FBSyxLQUFMLENBQVcsRUFEakI7QUFFRSxrQkFBTSxLQUFLLEtBQUwsQ0FBVyxFQUZuQjtBQUdFLGtCQUFNLElBSFI7QUFJRSx5QkFBYSxLQUFLLEtBQUwsQ0FBVyxXQUoxQjtBQUtFLHNCQUFVLEtBQUssS0FBTCxDQUFXLFFBTHZCO0FBTUUscUJBQVMsS0FBSyxLQUFMLENBQVcsT0FOdEI7QUFPRSxzQkFBVSxLQUFLLEtBQUwsQ0FBVyxRQVB2QjtBQVFFLHFCQUFTLEtBQUssS0FBTCxDQUFXLE9BUnRCO0FBU0UsbUJBQU87QUFUVDtBQURGO0FBRkYsT0FERjtBQWtCRDs7OztFQTFCdUMsTUFBTSxTOztrQkFBM0IsWTtBQTRCcEI7Ozs7O0FDNUJEOzs7Ozs7QUFFQSxTQUFTLE1BQVQsQ0FDRSxnREFERixFQUVFLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUZGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTbGFjdG9ySW5wdXQgZnJvbSAnLi9TbGFjdG9ySW5wdXQuanN4JztcclxuXHJcbmNvbnN0IFNBSVNJRSA9IDE7XHJcbmNvbnN0IEVOVk9JID0gMjtcclxuY29uc3QgT0sgPSAzO1xyXG5jb25zdCBLTyA9IDQ7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGFjdG9yRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFubmVsQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFubmVsQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVCb3ROYW1lQ2hhbmdlID0gdGhpcy5oYW5kbGVCb3ROYW1lQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVJY29uVXJsQ2hhbmdlID0gdGhpcy5oYW5kbGVJY29uVXJsQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlQ2hhbmdlID0gdGhpcy5oYW5kbGVNZXNzYWdlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlRm9jdXMgPSB0aGlzLmhhbmRsZU1lc3NhZ2VGb2N1cy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUGFzc3dvcmRDaGFuZ2UgPSB0aGlzLmhhbmRsZVBhc3N3b3JkQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlSW5wdXRGb2N1cyA9IHRoaXMuaGFuZGxlSW5wdXRGb2N1cy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHN0YXR1dDogU0FJU0lFXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFubmVsQ2hhbmdlKGNoYW5uZWwpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY2hhbm5lbDogY2hhbm5lbC50YXJnZXQudmFsdWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQm90TmFtZUNoYW5nZShib3ROYW1lKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGJvdE5hbWU6IGJvdE5hbWUudGFyZ2V0LnZhbHVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUljb25VcmxDaGFuZ2UoaWNvblVybCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpY29uVXJsOiBpY29uVXJsLnRhcmdldC52YWx1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVNZXNzYWdlQ2hhbmdlKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbWVzc2FnZTogbWVzc2FnZS50YXJnZXQudmFsdWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUGFzc3dvcmRDaGFuZ2UocGFzc3dvcmQpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcGFzc3dvcmQ6IHBhc3N3b3JkLnRhcmdldC52YWx1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTdWJtaXQoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBheWxvYWQgOiBcIiArIHBheWxvYWQpO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtID0gdGhpcztcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvbWVzc2FnZXNcIixcclxuICAgICAgICAgICAgZGF0YTogcGF5bG9hZCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPSyBcIiArIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgZm9ybS5zZXRTdGF0ZSh7IHN0YXR1dDogT0sgfSk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLTyBcIiArIGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGZvcm0uc2V0U3RhdGUoeyBzdGF0dXQ6IEtPLCBlcnJvcjoganFYSFIucmVzcG9uc2VUZXh0IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUlucHV0Rm9jdXMoKXtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGF0dXQgPT09IE9LIHx8IHRoaXMuc3RhdGUuc3RhdHV0ID09PSBLTykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3RhdHV0OiBTQUlTSUUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1lc3NhZ2VGb2N1cygpe1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZUlucHV0Rm9jdXMoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhdHV0ID09PSBPSykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbWVzc2FnZTogJycgfSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICAvKiBsJ2ltYWdlIHN1Y2Nlc3Mvw6ljaGVjIGFmZmljaMOpZSBhcHLDqHMgZW52b2kgZHUgbWVzc2FnZSAqL1xyXG4gICAgICAgIHZhciBpbWFnZVN0YXR1dCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhdHV0ID09PSBFTlZPSSkge1xyXG4gICAgICAgICAgICBpbWFnZVN0YXR1dCA9IDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvbG9hZGluZy5naWZcIiBhbHQ9XCJMb2FkaW5nLi4uXCIgLz5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5zdGF0dXQgPT09IE9LKSB7XHJcbiAgICAgICAgICAgIGltYWdlU3RhdHV0ID0gPHNwYW4+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImltZy9PSy5wbmdcIiBhbHQ9XCJNZXNzYWdlIHNlbnQuXCIgLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN1Y2Nlc3NcIj5NZXNzYWdlIGVudm95w6k8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuc3RhdHV0ID09PSBLTykge1xyXG4gICAgICAgICAgICBpbWFnZVN0YXR1dCA9IDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvS08ucG5nXCIgYWx0PVwiTWVzc2FnZSBub3Qgc2VudC5cIiAvPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXJyb3JcIj57dGhpcy5zdGF0ZS5lcnJvcn08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBjb2wtc20tMTIgY29sLW1kLTEyIGNvbC1sZy1vZmZzZXQtMiBjb2wtbGctOCBibG9jLWlucHV0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImZvcm0taG9yaXpvbnRhbFwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2xhY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImNoYW5uZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJOb20gZHUgc2Fsb25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFeGVtcGxlIDogI2dlbmVyYWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5uZWxDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUlucHV0Rm9jdXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZCAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2xhY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImJvdE5hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJQc2V1ZG9ueW1lIGR1IGJvdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkV4ZW1wbGUgOiBHZW9yZ2UgQWJpdGJvbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5ib3ROYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQm90TmFtZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlSW5wdXRGb2N1c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxTbGFjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiaWNvblVybFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlVSTCBkZSBsJ2ltYWdlIGR1IGJvdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlVSTCBkZSBsJ2ltYWdlIGRlIGwnYXZhdGFyIGR1IGJvdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5pY29uVXJsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSWNvblVybENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlSW5wdXRGb2N1c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxTbGFjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIk1lc3NhZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUYXBleiBpY2kgbGUgbWVzc2FnZSDDoCBlbnZveWVyLi4uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVNZXNzYWdlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVNZXNzYWdlRm9jdXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZCAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2xhY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiTW90IGRlIHBhc3NlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVBhc3N3b3JkQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVJbnB1dEZvY3VzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctb2Zmc2V0LTMgY29sLWxnLTlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIHZhbHVlPVwiRW52b3llclwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aW1hZ2VTdGF0dXR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xhY3RvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG5cclxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnByb3BzLnR5cGUgPT09ICdwYXNzd29yZCcgPyAncGFzc3dvcmQnIDogJ3RleHQnO1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQgPyAnJyA6IHRoaXMucHJvcHMudmFsdWU7XHJcbiAgICBjb25zdCBkaXZDbGFzcyA9IFwiZm9ybS1ncm91cCBcIiArICh0aGlzLnByb3BzLnJlcXVpcmVkID09PSB0cnVlID8gJ3JlcXVpcmVkJyA6ICcnKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZGl2Q2xhc3N9PlxyXG4gICAgICAgIDxsYWJlbCBodG1sRm9yPXt0aGlzLnByb3BzLmlkfSBjbGFzc05hbWU9XCJjb2wtbGctMyBjb250cm9sLWxhYmVsXCI+e3RoaXMucHJvcHMubGFiZWx9PC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy05XCI+XHJcbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWR9XHJcbiAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuaWR9XHJcbiAgICAgICAgICAgIHR5cGU9e3R5cGV9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgICByZXF1aXJlZD17dGhpcy5wcm9wcy5yZXF1aXJlZH1cclxuICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5wcm9wcy5vbkZvY3VzfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgb25SZXNldD17dGhpcy5wcm9wcy5vblJlc2V0fVxyXG4gICAgICAgICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbiAgXHJcbn07IiwiaW1wb3J0IFNsYWN0b3JGb3JtIGZyb20gJy4vU2xhY3RvckZvcm0uanN4J1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gIDxTbGFjdG9yRm9ybSAvPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXHJcbik7XHJcbiJdfQ==
