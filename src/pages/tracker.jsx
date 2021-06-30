import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Flex } from '@blockstack/ui';

import Menu from '../components/dashboard/Menu';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import WalletsTracked from '../components/dashboard/Tracker/WalletsTracked';
import { logoutUser } from '../actions/authActions';

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <Flex alignItems="stretch">
        <Menu ActivePage={1} />
        <Box className="main-body">          
          <Header/>
		  <Box>          
            <WalletsTracked />
          </Box>
		  <Footer/>
        </Box>
      </Flex>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);

