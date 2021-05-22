import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Flex, Text } from '@blockstack/ui';

import Menu from '../components/dashboard/Menu';
import Footer from '../components/dashboard/Footer';
import WalletsTracked from '../components/dashboard/Tracker/WalletsTracked';
import TransactionLog from '../components/dashboard/Tracker/TransactionLog';
import { logoutUser } from '../actions/authActions';

class Tracker extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  // componentWillMount() {
  //   let token = localStorage.getItem("token");
  //   if (!token || token === "false") {
  //     console.log('token', token)
  //     this.setState({
  //       isAutherized: true
  //     })
  //   }
  // }

  render() {
    const TokenContents = [
      ['0x7122C911045951158a14Ce2CE201fs452cc51458', 1, 'Sold 500k Tokens of Safemon'],
      ['BitcoinSuperstar', 0, 'Sold 500k Tokens of Safemon'],
    ];
    const TransactionContents = [
      ['0x7122C911045951158a14Ce2CE201fs452cc51451', 'Cummies', '2021-05-14', 1000000, 400001],
      ['0x7122C911045951158a14Ce2CE201fs452cc51452', 'Cummies', '2021-05-09', -1000000, 400003],
      ['0x7122C911045951158a14Ce2CE201fs452cc51453', 'Cummies', '2021-05-11', 1000000, 400007],
      ['0x7122C911045951158a14Ce2CE201fs452cc51454', 'Cummies', '2021-05-10', -1000000, 400006],
      ['0x7122C911045951158a14Ce2CE201fs452cc51455', 'Cummies', '2021-05-12', 1000000, 400004],
      ['0x7122C911045951158a14Ce2CE201fs452cc51456', 'Cummies', '2021-05-13', -1000000, 400009],
      ['0x7122C911045951158a14Ce2CE201fs452cc51457', 'Cummies', '2021-05-07', 1000000, 400000],
      ['0x7122C911045951158a14Ce2CE201fs452cc51458', 'Cummies', '2021-05-06', -1000000, 400008],
      ['0x7122C911045951158a14Ce2CE201fs452cc51459', 'Cummies', '2021-05-05', 1000000, 400002],
      ['0x7122C911045951158a14Ce2CE201fs452cc51450', 'Cummies', '2021-05-08', -1000000, 400005],
    ];
    return (
      <Flex alignItems="stretch">
        <Menu ActivePage={2} />
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
              Wallet tracker
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
              <Box width={['100%', '100%', '100%', '300px']} display="inline-block">
                <Text fontSize={['20px', '24px']} fontWeight="500">
                  Wallet
                </Text>
                <br />
                <Box as="input" width="100%" />
              </Box>
              <Box
                width={['100%', '100%', '100%', '300px']}
                display="inline-block"
                ml={['0', '0', '0', '10px']}
              >
                <Text fontSize={['20px', '24px']} fontWeight="500">
                  Description
                </Text>
                <br />
                <Box as="input" width="65%" />
                <Box
                  as="button"
                  backgroundColor="transparent"
                  cursor="pointer"
                  ml={['10px']}
                  border="none"
                  fontSize={['12px', '14px']}
                  _focus={{ outline: 'none' }}
                  _hover={{ textDecoration: 'underline' }}
                >
                  Add Wallet
                </Box>
              </Box>
            </Box>
            <WalletsTracked TableContents={TokenContents} />
            <TransactionLog TableContents={TransactionContents} />
          </Box>
          <Footer />
        </Box>
      </Flex>
    );
  }
}

Tracker.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Tracker);
