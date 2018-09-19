import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    return (
      <div className="input-group">
        {/* <label htmlFor=/> */}
        <input {...this.props} />
      </div>
    );
  }
}
