import React, { Component } from 'react';
import Input from './Input';

// My goal is to make something like downshift is but with a form. I hope to learn a ton from it.

export default class Form extends Component {
  render() {
    return (
      <form {...this.props}>
        <Input type="text" />
      </form>
    );
  }
}
