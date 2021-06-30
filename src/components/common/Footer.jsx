import React, { Component } from 'react';
import { Box} from '@blockstack/ui';
import logo from '../../assets/images/Logo-Spark.png';

class Footer extends Component {
  
  render() {
    return (
      <Box className="footer pt-3">
			<div className="row py-4">
				<div className="col-md-3">
					<div className="menu-title my-5"><img src={logo} className="title" alt="Logo"/></div>
					<div className="my-2 opacity-05 ">© 2021, Minr.</div>
					<div className="my-2 opacity-05 ">All rights reserved. </div>
					<div className="my-5"><span className=" bold">Back to </span><a href="http://minr.tech" target="_blank" rel="noreferrer" className="text-success bold">MINR TECH</a></div>
				</div>
				<div className="col-md-3">
					<h4 className="footer-title">Various</h4>
					<div className="green-bar my-4"></div>
					<div className="my-4 opacity-05 "><a href="https://drive.google.com/file/d/1fxUhA1kUB7vYMV_Uupd2F1l11K0tYTj4/view" target="_blank" rel="noreferrer">Whitepaper</a></div>
					<div className="my-4 opacity-05 "><a href="http://minr.tech/buy.html" target="_blank" rel="noreferrer">How to buy</a></div>
					<div className="my-4 opacity-05 "><a href="https://drive.google.com/drive/folders/1Jun1NSifp3G-EhN7elbVtpoS73hvueKw" target="_blank" rel="noreferrer">Branding Package</a></div>
				</div>
				<div className="col-md-3">
					<h4 className="footer-title">About</h4>
					<div className="green-bar my-4"></div>
					<div className="my-4 opacity-05 "><a href="https://drive.google.com/file/d/1fxUhA1kUB7vYMV_Uupd2F1l11K0tYTj4/view?usp=drivesdk" target="_blank" rel="noreferrer">Meet the team</a></div>
					<div className="my-4 opacity-05 "><a href="https://drive.google.com/file/d/1fxUhA1kUB7vYMV_Uupd2F1l11K0tYTj4/view?usp=drivesdk" target="_blank" rel="noreferrer">Jobs</a></div>
				</div>
				<div className="col-md-3">
					<h4 className="footer-title">Community</h4>
					<div className="green-bar my-4"></div>
					<div className="my-4 opacity-05 "><a href="https://drive.google.com/file/d/1fxUhA1kUB7vYMV_Uupd2F1l11K0tYTj4/view?usp=drivesdk" target="_blank" rel="noreferrer">Twitter</a></div>
					<div className="my-4 opacity-05 "><a href="https://drive.google.com/file/d/1fxUhA1kUB7vYMV_Uupd2F1l11K0tYTj4/view?usp=drivesdk" target="_blank" rel="noreferrer">Telegram</a></div>
				</div>
			</div>
      </Box>
    );
  }
}


export default Footer;
