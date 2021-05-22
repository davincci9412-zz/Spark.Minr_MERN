import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Flex, Text } from '@blockstack/ui';

import Menu from '../components/dashboard/Menu';
import Footer from '../components/dashboard/Footer';
import Wallet from '../components/dashboard/Wallet';
import { logoutUser } from '../actions/authActions';

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const WalletContents = [
      ['BTC', 7, 19.5, 19.5, 19.5, 18, 1],
      ['Safe Moon', 10, 19.5, 19.5, 19.5, -9, 0],
    ];
    return (
      <Flex alignItems="stretch">
        <Menu ActivePage={0} />
        <Box
          flex={['0 0 100%', '0 0 calc(100% - 230px)']}
          maxWidth={['100%', 'calc(100% - 230px)']}
        >
          <Flex
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #ced4da"
            p={['20px 20px 20px 20px']}
          >
            <Text fontSize={['32px']} fontWeight="500" mb="10px">
              My Wallet
            </Text>
            <Box
              as="button"
              backgroundColor="#efc35c"
              border="none"
              outline="none"
              cursor="pointer"
              px="40px"
              fontSize={['14px', '16px']}
              fontWeight="500"
              height="40px"
              borderRadius="50px"
              _focus={{ outline: 'none' }}
              mb="10px"
            >
              Refresh
            </Box>
          </Flex>
          <Box p="30px 20px">
            <Box>
              <Text fontSize={['20px', '24px']} fontWeight="500">
                Add Contract to my wallet
              </Text>
              <br />
              <Box as="input" width={['100%', '100%', '300px']} />
              <Box
                as="button"
                backgroundColor="transparent"
                cursor="pointer"
                ml={['0', '0', '30px']}
                border="none"
                fontSize={['12px', '14px']}
                _focus={{ outline: 'none' }}
                _hover={{ textDecoration: 'underline' }}
              >
                Load
              </Box>
              <Box
                as="button"
                backgroundColor="transparent"
                cursor="pointer"
                ml="30px"
                border="none"
                fontSize={['12px', '14px']}
                _focus={{ outline: 'none' }}
                _hover={{ textDecoration: 'underline' }}
              >
                Add
              </Box>
              <Box
                as="button"
                backgroundColor="transparent"
                cursor="pointer"
                ml="30px"
                border="none"
                fontSize={['12px', '14px']}
                _focus={{ outline: 'none' }}
                _hover={{ textDecoration: 'underline' }}
              >
                Name
              </Box>
            </Box>
            <Wallet WalletName="Wallet 1" TableContents={WalletContents} />
            <Wallet WalletName="Wallet 2" TableContents={WalletContents} />
            <Wallet WalletName="Wallet 3" TableContents={WalletContents} />
          </Box>
          <Footer />
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
