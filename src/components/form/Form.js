import React, { Component } from 'react';
import PropTypes from 'prop-types';

// My goal is to make something like downshift is but with a form. I hope to learn a ton from it.

export default class Form extends Component {
  static defaultProps = {
    onSubmit: undefined,
  };

  state = {
    triedToSubmit: false,
  };

  submitIsControlled = () => this.props.onSubmit !== undefined;

  handleSubmit = ev => {
    ev.preventDefault();
    const elements = Array.from(ev.currentTarget.elements);
    const invalidRequiredInput = elements.some(el => {
      if (el.value === '' && el.dataset.isrequired) {
        this.setState({ triedToSubmit: true });
        return true;
      }
      return false;
    });
    if (this.submitIsControlled() && !invalidRequiredInput) {
      const inputValues = elements.reduce((values, el) => {
        if (el.dataset.isreactinput) {
          const value = {};
          value[el.id] = el.value;
          values.push(value);
        }
        return values;
      }, []);
      this.props.onSubmit(...inputValues);
    }
  };

  render() {
    const { children, onSubmit, ...restOfProps } = this.props;
    if (!children) console.error('The Form Component must have children');
    const newChildren = React.Children.map(
      this.props.children,
      child =>
        (child.type && child.type.name === 'Input'
          ? React.cloneElement(child, {
              wasSubmitted: this.state.triedToSubmit,
            })
          : child)
    );
    return (
      <form {...restOfProps} onSubmit={this.handleSubmit}>
        {newChildren}
        <input type="submit" aria-label="submit-button" value="Submit" />
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onSubmit: PropTypes.func,
};
