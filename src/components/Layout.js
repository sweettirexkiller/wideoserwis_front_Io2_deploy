import React, { Component } from 'react';
import NavBarMenu from './NavBarMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavBarMenu />
        {this.props.children}
      </div>
    );
  }
}
