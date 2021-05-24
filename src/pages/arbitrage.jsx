import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Text, Flex } from '@blockstack/ui';

import Menu from '../components/dashboard/Menu';
import Token from '../components/dashboard/Exchange/Token';
import Tax from '../components/dashboard/Exchange/Tax';
import Net from '../components/dashboard/Exchange/Net';
import Footer from '../components/dashboard/Footer';
import { logoutUser } from '../actions/authActions';

class Arbitrage extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const TokenContents = [
      [
        ['Safemoon', 'USDT'],
        [0.0003, 19.5],
        [0.0003, 19.5],
        [0.0003, 19.5],
        ['Safemoon', 'USDT'],
        70.53,
        'Buy E3',
        'Sell E.T',
        '',
        'Green',
        '1234567890',
        1,
      ],
      [
        ['Safemoon', 'USDT'],
        [0.0002, 19.6],
        [0.0003, 19.5],
        [0.0003, 19.5],
        ['Safemoon', 'USDT'],
        30.53,
        'Buy E3',
        'Sell E.T',
        '',
        'Green',
        '1234567890',
        1,
      ],
    ];
    const TaxContents = [
      [['Safemoon', 'USDT'], 11, 12, 10, 13, 10],
      [['Safemoon', 'USDT'], 10, 11, 12, 11, 13],
      [['Safemoon', 'USDT'], 13, 10, 11, 12, 12],
      [['Safemoon', 'USDT'], 12, 13, 13, 10, 11],
    ];
    const NetContents = [
      [['Safemoon', 'USDT'], 10, 10, 10, 10, 10, 9.29, 9.29, 9.29, 9.29],
      [['Safemoon', 'USDT'], 10, 10, 10, 10, 10, 9.29, 9.29, 9.29, 9.29],
      [['Safemoon', 'USDT'], 10, 10, 10, 10, 10, 9.29, 9.29, 9.29, 9.29],
      [['Safemoon', 'USDT'], 10, 10, 10, 10, 10, 9.29, 9.29, 9.29, 9.29],
    ];
    return (
      <Flex alignItems="stretch">
        <Menu ActivePage={1} />
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
              Exchange Arbitrage
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
            <Token
              TableFields={['Token', 'Buy', 'Transfer', 'Sell', 'Buffer', 'TOTOAL']}
              TableContents={TokenContents}
            />            
          </Box>
        </Box>
      </Flex>
    );
  }
}

Arbitrage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Arbitrage);
