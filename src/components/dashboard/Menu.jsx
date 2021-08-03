import React from 'react';
import logo from '../../assets/images/Logo-Spark.png';
import icon0 from '../../assets/images/icon-menu.png';
import icon00 from '../../assets/images/icon-menu-close.png';
import icon1 from '../../assets/images/menu-address.png';
import icon2 from '../../assets/images/menu-address-active.png';
import icon3 from '../../assets/images/menu-tracker.png';
import icon4 from '../../assets/images/menu-tracker-active.png';
import icon5 from '../../assets/images/menu-exchange.png';
import icon6 from '../../assets/images/menu-exchange-active.png';
import { Box, Text } from '@blockstack/ui';
import { Link } from 'react-router-dom';

const Menu = ({ ActivePage }) => {
  return (
    <Box className="menu-class" ID="menu">
      <div className="menu-title">
        <img src={logo} className="title left" alt="Logo"/>
        <div onClick={menuClick}>
          <img src={icon0} className="menu-title-icon cursor hide" alt="Show" />
          <img src={icon00} className="menu-title-icon cursor show" alt="Close" />
        </div>
      </div>
	  <div className="menu-sub-title opacity-03">by minr.tech</div>
      <Link to="/dashboard" className={ActivePage === 0 ? 'menu-item menu-address active' : 'menu-item menu-address'}>
        <img src={icon1} className="menu-icon opacity-05 no-active" alt="Address"/>
        <img src={icon2} className="menu-icon opacity-05 active" alt="Address"/>
        <Text className="menu-text opacity-05">My Address</Text>
      </Link>
      <Link to="/tracker" className={ActivePage === 1 ? 'menu-item menu-tracker active' : 'menu-item menu-tracker'}>
        <img src={icon3} className="menu-icon opacity-05 no-active" alt="Address"/>
        <img src={icon4} className="menu-icon opacity-05 active" alt="Address"/>
        <Text className="menu-text opacity-05">Address Tracker</Text>
      </Link>
      <Link to="/exchange" className={ActivePage === 2 ? 'menu-item menu-exchange active' : 'menu-item menu-exchange'}>
        <img src={icon5} className="menu-icon opacity-05 no-active" alt="Address"/>
        <img src={icon6} className="menu-icon opacity-05 active" alt="Address"/>
        <Text className="menu-text opacity-05">Exchange Arbitrage</Text>
      </Link>
      {/* <Link to="/tracker1" className={ActivePage === 3 ? 'menu-item active' : 'menu-item'}>
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
      </Link> */}
    </Box>
  );
};

export default Menu;

function menuClick(){
	const menu = document.getElementsByClassName("App")[0];
	if (menu.classList.contains("menu-close")) {
		menu.classList.remove("menu-close");
	} else {
		menu.className += " menu-close";
	}	  
}

