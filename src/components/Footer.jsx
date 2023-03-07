import { Component } from 'react';

export class Footer extends Component {
  render() {
    return (
      <div className="text-center py-5">
        {'Copyright © '} {new Date().getFullYear()}{' '}
        {'All rights reserved Zita.'}
      </div>
    );
  }
}

export default Footer;
