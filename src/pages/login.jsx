import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box } from '@blockstack/ui';

import LoginForm from '../components/login/LoginForm';
import { loginUser } from '../actions/authActions';

class Login extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
	    //this.props.history.push('/exchange');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
	    //this.props.history.push('/exchange');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  render() {
    return (
      <Box px={[3, 4]} py={[3, '50px']} maxWidth="960px" mx="auto">
        <LoginForm
          SigninOrUp="Log in"
          EventHandler={this.props.loginUser}
          Errors={this.props.errors}
        />
      </Box>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
