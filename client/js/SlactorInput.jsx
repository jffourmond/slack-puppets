import React from 'react';
export default class SlactorInput extends React.Component {

  render() {

    const type = this.props.type === 'password' ? 'password' : 'text';
    const value = this.props.value === undefined ? '' : this.props.value;
    const divClass = "form-group " + (this.props.required === true ? 'required' : '');

    return (
      <div className={divClass}>
        <label htmlFor={this.props.id} className="col-lg-3 control-label">{this.props.label}</label>
        <div className="col-lg-9">
          <input className="form-control"
            id={this.props.id}
            name={this.props.id}
            type={type}
            placeholder={this.props.placeholder}
            required={this.props.required}
            onFocus={this.props.onFocus}
            onChange={this.props.onChange}
            onReset={this.props.onReset}
            value={value}
            />
        </div>
      </div>
    );
  }
  
};