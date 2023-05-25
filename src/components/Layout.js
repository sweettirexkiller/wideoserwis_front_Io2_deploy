import React, { Component } from 'react';
import NavBarMenu from './NavBarMenu';
import LargeWithAppLinksAndSocial from './Footer';
import { Box, Container, VStack } from '@chakra-ui/react';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavBarMenu />
        {this.props.children}
        <LargeWithAppLinksAndSocial/>
      </div>

    );
  }
}
