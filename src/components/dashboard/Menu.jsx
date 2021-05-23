import React from 'react';
import { Box, Text } from '@blockstack/ui';
import { Link } from 'react-router-dom';

import './Menu.css';
/*
const Menu = ({ ActivePage }) => {
  return (
    <Box flex="0 0 230px" borderRight="1px solid #ddd" display={['none', 'block']}>
      <Link to="/dashboard" className={ActivePage === 0 ? 'menu-item active' : 'menu-item'}>
        <Text className="fa fa-credit-card" fontSize="30px" color="#efc35c"></Text>&nbsp;&nbsp;
        <Text fontFamily="16px" fontWeight="500">
          My Wallet
        </Text>
      </Link>
      <Link to="/exchange" className={ActivePage === 1 ? 'menu-item active' : 'menu-item'}>
        <Text className="fa fa-exchange" fontSize="30px" color="#efc35c"></Text>&nbsp;&nbsp;
        <Text fontFamily="16px" fontWeight="500">
          Exchange Arbitrage
        </Text>
      </Link>
      <Link to="/tracker" className={ActivePage === 2 ? 'menu-item active' : 'menu-item'}>
        <Text className="fa fa-google-wallet" fontSize="30px" color="#efc35c"></Text>&nbsp;&nbsp;
        <Text fontFamily="16px" fontWeight="500">
          Wallet Tracker
        </Text>
      </Link>
      <Link to="/tracker" className={ActivePage === 3 ? 'menu-item active' : 'menu-item'}>
        <Text className="fa fa-cogs" fontSize="30px" color="#efc35c"></Text>&nbsp;&nbsp;
        <Text fontFamily="16px" fontWeight="500">
          Token Config
        </Text>
      </Link>
      <Link to="/tracker" className={ActivePage === 3 ? 'menu-item active' : 'menu-item'}>
        <Text className="fa fa-credit-card" fontSize="30px" color="#efc35c"></Text>&nbsp;&nbsp;
        <Text fontFamily="16px" fontWeight="500">
          Exchange Config
        </Text>
      </Link>
    </Box>
  );
};
*/

const Menu = ({ ActivePage }) => {
  return (
    <Box flex="0 0 230px" borderRight="1px solid #ddd" display={['none', 'block']}>
      <Link to="/dashboard" className={ActivePage === 0 ? 'menu-item active' : 'menu-item'}>
        <Text className="fa fa-credit-card" fontSize="30px" color="#efc35c"></Text>&nbsp;&nbsp;
        <Text fontFamily="16px" fontWeight="500">
          My Wallet
        </Text>
      </Link>
      <Link to="/exchange" className={ActivePage === 1 ? 'menu-item active' : 'menu-item'}>
        <Text className="fa fa-exchange" fontSize="30px" color="#efc35c"></Text>&nbsp;&nbsp;
        <Text fontFamily="16px" fontWeight="500">
          Exchange Arbitrage
        </Text>
      </Link>
      <Link to="/exchange" className={ActivePage === 2 ? 'menu-item active' : 'menu-item'}>
        <Text className="fa fa-google-wallet" fontSize="30px" color="#efc35c"></Text>&nbsp;&nbsp;
        <Text fontFamily="16px" fontWeight="500">
          Wallet Tracker
        </Text>
      </Link>
      <Link to="/exchange" className={ActivePage === 3 ? 'menu-item active' : 'menu-item'}>
        <Text className="fa fa-cogs" fontSize="30px" color="#efc35c"></Text>&nbsp;&nbsp;
        <Text fontFamily="16px" fontWeight="500">
          Token Config
        </Text>
      </Link>
      <Link to="/exchange" className={ActivePage === 3 ? 'menu-item active' : 'menu-item'}>
        <Text className="fa fa-credit-card" fontSize="30px" color="#efc35c"></Text>&nbsp;&nbsp;
        <Text fontFamily="16px" fontWeight="500">
          Exchange Config
        </Text>
      </Link>
    </Box>
  );
};

export default Menu;
