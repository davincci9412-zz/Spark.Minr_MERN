import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Flex } from '@blockstack/ui';

import Logo from '../../assets/images/logo.jpeg';
import { logoutUser } from '../../actions/authActions';
import Profile from './Profile';

class Header extends Component {
  onLogout = e => {
    this.props.logoutUser();
    window.location.href = '/';
  };

  render() {
    return (
      <Flex height="55px" backgroundColor="#13161B" justifyContent="center" alignItems="center">
        <Box as="img" src={Logo} height="30px" />
        {this.props.auth.isAuthenticated ? (
          <Profile username="User" onLogout={this.onLogout} />
        ) : null}
      </Flex>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Header);
