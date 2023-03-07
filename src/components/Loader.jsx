import { Component } from 'react';

export default class Loader extends Component {
  render() {
    return (
      <div className="loading-wrapper">
        <div className="spinner-grow spinner-grow-sm"></div>
      </div>
    );
  }
}
