import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  static defaultProps = {
    allName: undefined,
    labelContent: undefined,
    hasLabel: undefined,
    isRequired: false,
    requiredMessage: 'This input is required',
    wasSubmitted: false,
    labelClass: 'input-label',
    inputClass: 'input',
    requiredMessageClass: 'required-message',
  };

  state = {
    isEmpty: true,
  };

  handleChange = ev => {
    const isEmpty = ev.currentTarget.value === '';
    this.setState({ isEmpty });
  };

  render() {
    const {
      allName,
      isRequired,
      labelContent,
      hasLabel,
      requiredMessage,
      wasSubmitted,
      labelClass,
      inputClass,
      requiredMessageClass,
      ...rest
    } = this.props;
    const { isEmpty } = this.state;
    return (
      <div className="input-group">
        {hasLabel && (
          <label htmlFor={allName} className={labelClass}>
            {labelContent}
          </label>
        )}
        <input
          id={allName}
          aria-label={allName}
          className={inputClass}
          {...rest}
          onChange={this.handleChange}
          data-isrequired={isRequired || false}
          data-isreactinput
        />
        {isRequired && wasSubmitted && isEmpty && <span className={requiredMessageClass}>{requiredMessage}</span>}
      </div>
    );
  }
}

Input.propTypes = {
  allName: PropTypes.string,
  labelContent: PropTypes.string,
  hasLabel: PropTypes.bool,
  isRequired: PropTypes.bool,
  requiredMessage: PropTypes.string,
  wasSubmitted: PropTypes.bool,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  requiredMessageClass: PropTypes.string,
};
