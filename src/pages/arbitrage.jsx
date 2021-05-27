import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Flex } from '@blockstack/ui';
import Menu from '../components/dashboard/Menu';
import Token from '../components/dashboard/Exchange/Token';

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
    return (
      <Flex alignItems="stretch">
        <Menu ActivePage={1} />
        <Box
          flex={['0 0 100%', '0 0 calc(100% - 230px)']}
          maxWidth={['100%', 'calc(100% - 230px)']}
        >          
          <Box>
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
