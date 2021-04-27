import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Menu } from 'semantic-ui-react';
import './MainHeader.css';

class MainHeader extends Component {
  render() {
    return (
      <Menu id='header-menu'>
        <Menu.Item position='left'>
          <Image
            id='bvl-logo'
            src={`${process.env.PUBLIC_URL}/assets/bvl_logo_with_slogan.svg`}
            alt='BudgetVanLines.com'
          />
        </Menu.Item>

        <Menu.Item position='right'>
          <a id='company-phone-number' href='tel:(800) 611-6001'>
            (800) 611-6001
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default connect(null, {})(MainHeader);
