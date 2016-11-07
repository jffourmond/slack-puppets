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

    function SlactorForm() {
        _classCallCheck(this, SlactorForm);

        return _possibleConstructorReturn(this, (SlactorForm.__proto__ || Object.getPrototypeOf(SlactorForm)).apply(this, arguments));
    }

    _createClass(SlactorForm, [{
        key: "getInitialState",
        value: function getInitialState() {
            return {
                statut: SAISIE
            };
        }
    }, {
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
        value: function handleSubmit(e) {
            e.preventDefault();
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
        key: "passerEnModeSaisie",
        value: function passerEnModeSaisie() {
            console.log(" mode saisie");
            if (this.state.statut === OK || this.state.statut === KO) {
                console.log(" mode saisie Reset");
                this.setState({ statut: SAISIE, message: undefined });
            }
        }
    }, {
        key: "render",
        value: function render() {
            console.log("statut: " + this.state.statut);

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
                            onChange: this.handleChannelChange,
                            required: true }),
                        React.createElement(_SlactorInput2.default, {
                            id: "botName",
                            label: "Pseudonyme du bot",
                            placeholder: "Exemple : George Abitbol",
                            onChange: this.handleBotNameChange,
                            required: true }),
                        React.createElement(_SlactorInput2.default, {
                            id: "iconUrl",
                            label: "URL de l'image du bot",
                            placeholder: "URL de l'image de l'avatar du bot",
                            onChange: this.handleIconUrlChange
                        }),
                        React.createElement(_SlactorInput2.default, {
                            id: "text",
                            label: "Message",
                            placeholder: "Tapez ici le message \xE0 envoyer...",
                            onChange: this.handleMessageChange,
                            required: true }),
                        React.createElement(_SlactorInput2.default, {
                            id: "password",
                            label: "Mot de passe",
                            onChange: this.handlePasswordChange,
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

      var inputClass = "form-group " + (this.props.required === true ? 'required' : '');
      return React.createElement(
        'div',
        { className: inputClass },
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
            placeholder: this.props.placeholder,
            required: this.props.required,
            onFocus: this.props.onFocus,
            onChange: this.props.onChange,
            onReset: this.props.onReset
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnRcXGpzXFxTbGFjdG9yRm9ybS5qc3giLCJjbGllbnRcXGpzXFxTbGFjdG9ySW5wdXQuanN4IiwiY2xpZW50XFxqc1xcY2xpZW50LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sU0FBUyxDQUFmO0FBQ0EsSUFBTSxRQUFRLENBQWQ7QUFDQSxJQUFNLEtBQUssQ0FBWDtBQUNBLElBQU0sS0FBSyxDQUFYOztJQUVxQixXOzs7Ozs7Ozs7OzswQ0FFQztBQUNkLG1CQUFPO0FBQ0gsd0JBQVE7QUFETCxhQUFQO0FBR0g7Ozs0Q0FFbUIsTyxFQUFTO0FBQ3pCLGlCQUFLLFFBQUwsQ0FBYyxFQUFFLFNBQVMsUUFBUSxNQUFSLENBQWUsS0FBMUIsRUFBZDtBQUNIOzs7NENBRW1CLE8sRUFBUztBQUN6QixpQkFBSyxRQUFMLENBQWMsRUFBRSxTQUFTLFFBQVEsTUFBUixDQUFlLEtBQTFCLEVBQWQ7QUFDSDs7OzRDQUVtQixPLEVBQVM7QUFDekIsaUJBQUssUUFBTCxDQUFjLEVBQUUsU0FBUyxRQUFRLE1BQVIsQ0FBZSxLQUExQixFQUFkO0FBQ0g7Ozs0Q0FFbUIsTyxFQUFTO0FBQ3pCLGlCQUFLLFFBQUwsQ0FBYyxFQUFFLFNBQVMsUUFBUSxNQUFSLENBQWUsS0FBMUIsRUFBZDtBQUNIOzs7NkNBRW9CLFEsRUFBVTtBQUMzQixpQkFBSyxRQUFMLENBQWMsRUFBRSxVQUFVLFNBQVMsTUFBVCxDQUFnQixLQUE1QixFQUFkO0FBQ0g7OztxQ0FFWSxDLEVBQUc7QUFDWixjQUFFLGNBQUY7QUFDQSxnQkFBTSxVQUFVLEtBQUssU0FBTCxDQUFlLEtBQUssS0FBcEIsQ0FBaEI7QUFDQSxvQkFBUSxHQUFSLENBQVksZUFBZSxPQUEzQjs7QUFFQSxnQkFBTSxPQUFPLElBQWI7QUFDQSxtQkFBTyxFQUFFLElBQUYsQ0FBTztB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L0IsRUFBaUQsT0FBTSxTQUF2RCxHQURKO0FBRUs7QUFGTDtBQURKO0FBaENKO0FBREo7QUFESixhQURKO0FBNkNIOzs7O0VBekhvQyxNQUFNLFM7O2tCQUExQixXO0FBMEhwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNqSW9CLFk7Ozs7Ozs7Ozs7OzZCQUVWOztBQUVQLFVBQU0sYUFBYSxpQkFBaUIsS0FBSyxLQUFMLENBQVcsUUFBWCxLQUF3QixJQUF4QixHQUErQixVQUEvQixHQUE0QyxFQUE3RCxDQUFuQjtBQUNBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVyxVQUFoQjtBQUNFO0FBQUE7QUFBQSxZQUFPLFNBQVMsS0FBSyxLQUFMLENBQVcsRUFBM0IsRUFBK0IsV0FBVSx3QkFBekM7QUFBbUUsZUFBSyxLQUFMLENBQVc7QUFBOUUsU0FERjtBQUVFO0FBQUE7QUFBQSxZQUFLLFdBQVUsVUFBZjtBQUNFLHlDQUFPLFdBQVUsY0FBakI7QUFDRSxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxFQURqQjtBQUVFLGtCQUFNLEtBQUssS0FBTCxDQUFXLEVBRm5CO0FBR0UseUJBQWEsS0FBSyxLQUFMLENBQVcsV0FIMUI7QUFJRSxzQkFBVSxLQUFLLEtBQUwsQ0FBVyxRQUp2QjtBQUtFLHFCQUFTLEtBQUssS0FBTCxDQUFXLE9BTHRCO0FBTUUsc0JBQVUsS0FBSyxLQUFMLENBQVcsUUFOdkI7QUFPRSxxQkFBUyxLQUFLLEtBQUwsQ0FBVztBQVB0QjtBQURGO0FBRkYsT0FERjtBQWdCRDs7OztFQXJCdUMsTUFBTSxTOztrQkFBM0IsWTtBQXVCcEI7Ozs7O0FDdkJEOzs7Ozs7QUFFQSxTQUFTLE1BQVQsQ0FDRSxnREFERixFQUVFLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUZGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTbGFjdG9ySW5wdXQgZnJvbSAnLi9TbGFjdG9ySW5wdXQuanN4JztcclxuXHJcbmNvbnN0IFNBSVNJRSA9IDE7XHJcbmNvbnN0IEVOVk9JID0gMjtcclxuY29uc3QgT0sgPSAzO1xyXG5jb25zdCBLTyA9IDQ7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGFjdG9yRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXR1dDogU0FJU0lFXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5uZWxDaGFuZ2UoY2hhbm5lbCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjaGFubmVsOiBjaGFubmVsLnRhcmdldC52YWx1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVCb3ROYW1lQ2hhbmdlKGJvdE5hbWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYm90TmFtZTogYm90TmFtZS50YXJnZXQudmFsdWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlSWNvblVybENoYW5nZShpY29uVXJsKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGljb25Vcmw6IGljb25VcmwudGFyZ2V0LnZhbHVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1lc3NhZ2VDaGFuZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtZXNzYWdlOiBtZXNzYWdlLnRhcmdldC52YWx1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVQYXNzd29yZENoYW5nZShwYXNzd29yZCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwYXNzd29yZDogcGFzc3dvcmQudGFyZ2V0LnZhbHVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVN1Ym1pdChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBheWxvYWQgOiBcIiArIHBheWxvYWQpO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtID0gdGhpcztcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvbWVzc2FnZXNcIixcclxuICAgICAgICAgICAgZGF0YTogcGF5bG9hZCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPSyBcIiArIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgZm9ybS5zZXRTdGF0ZSh7IHN0YXR1dDogT0sgfSk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJLTyBcIiArIGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGZvcm0uc2V0U3RhdGUoeyBzdGF0dXQ6IEtPLCBlcnJvcjoganFYSFIucmVzcG9uc2VUZXh0IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBhc3NlckVuTW9kZVNhaXNpZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIiBtb2RlIHNhaXNpZVwiKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGF0dXQgPT09IE9LIHx8IHRoaXMuc3RhdGUuc3RhdHV0ID09PSBLTykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBtb2RlIHNhaXNpZSBSZXNldFwiKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHN0YXR1dDogU0FJU0lFLCBtZXNzYWdlOiB1bmRlZmluZWQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1dDogXCIgKyB0aGlzLnN0YXRlLnN0YXR1dCk7XHJcblxyXG4gICAgICAgIHZhciBpbWFnZVN0YXR1dCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhdHV0ID09PSBFTlZPSSkge1xyXG4gICAgICAgICAgICBpbWFnZVN0YXR1dCA9IDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvbG9hZGluZy5naWZcIiBhbHQ9XCJMb2FkaW5nLi4uXCIgLz5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5zdGF0dXQgPT09IE9LKSB7XHJcbiAgICAgICAgICAgIGltYWdlU3RhdHV0ID0gPHNwYW4+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImltZy9PSy5wbmdcIiBhbHQ9XCJNZXNzYWdlIHNlbnQuXCIgLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN1Y2Nlc3NcIj5NZXNzYWdlIGVudm95w6k8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuc3RhdHV0ID09PSBLTykge1xyXG4gICAgICAgICAgICBpbWFnZVN0YXR1dCA9IDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvS08ucG5nXCIgYWx0PVwiTWVzc2FnZSBub3Qgc2VudC5cIiAvPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXJyb3JcIj57dGhpcy5zdGF0ZS5lcnJvcn08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBjb2wtc20tMTIgY29sLW1kLTEyIGNvbC1sZy1vZmZzZXQtMiBjb2wtbGctOCBibG9jLWlucHV0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImZvcm0taG9yaXpvbnRhbFwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2xhY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImNoYW5uZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJOb20gZHUgc2Fsb25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFeGVtcGxlIDogI2dlbmVyYWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbm5lbENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxTbGFjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiYm90TmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlBzZXVkb255bWUgZHUgYm90XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRXhlbXBsZSA6IEdlb3JnZSBBYml0Ym9sXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUJvdE5hbWVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZCAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2xhY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImljb25VcmxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJVUkwgZGUgbCdpbWFnZSBkdSBib3RcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJVUkwgZGUgbCdpbWFnZSBkZSBsJ2F2YXRhciBkdSBib3RcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSWNvblVybENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxTbGFjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIk1lc3NhZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUYXBleiBpY2kgbGUgbWVzc2FnZSDDoCBlbnZveWVyLi4uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU1lc3NhZ2VDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZCAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2xhY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiTW90IGRlIHBhc3NlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVBhc3N3b3JkQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctb2Zmc2V0LTMgY29sLWxnLTlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIHZhbHVlPVwiRW52b3llclwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aW1hZ2VTdGF0dXR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xhY3RvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG5cclxuICAgIGNvbnN0IGlucHV0Q2xhc3MgPSBcImZvcm0tZ3JvdXAgXCIgKyAodGhpcy5wcm9wcy5yZXF1aXJlZCA9PT0gdHJ1ZSA/ICdyZXF1aXJlZCcgOiAnJyk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17aW5wdXRDbGFzc30+XHJcbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9e3RoaXMucHJvcHMuaWR9IGNsYXNzTmFtZT1cImNvbC1sZy0zIGNvbnRyb2wtbGFiZWxcIj57dGhpcy5wcm9wcy5sYWJlbH08L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTlcIj5cclxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZH1cclxuICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5pZH1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgICAgIHJlcXVpcmVkPXt0aGlzLnByb3BzLnJlcXVpcmVkfVxyXG4gICAgICAgICAgICBvbkZvY3VzPXt0aGlzLnByb3BzLm9uRm9jdXN9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgICBvblJlc2V0PXt0aGlzLnByb3BzLm9uUmVzZXR9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbiAgXHJcbn07IiwiaW1wb3J0IFNsYWN0b3JGb3JtIGZyb20gJy4vU2xhY3RvckZvcm0uanN4J1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gIDxTbGFjdG9yRm9ybSAvPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXHJcbik7XHJcbiJdfQ==
