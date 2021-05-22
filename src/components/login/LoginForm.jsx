import React, { useState } from 'react';
import { Box, Flex, Text, FormControl, FormLabel, Input } from '@blockstack/ui';
import GoogleLogin from 'react-google-login';
import isEmpty from 'is-empty';

import hlogo from '../../assets/images/hlogo.png';

const LoginForm = ({ SigninOrUp, EventHandler, Errors }) => {
  // const history = useHistory();
  const responseGoogle = response => {
    if (response.tokenId) {
      localStorage.setItem('token', response.tokenId);
    } else {
      localStorage.setItem('token', false);
    }
    // history.push('/dashboard')
  };

  const [index, setindex] = useState('email');

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = event => {
    event.preventDefault();
    const userData = {
      email: username,
      password: password,
    };
    EventHandler(userData);
  };

  const onRegister = event => {
    event.preventDefault();
    const userData = {
      email: username,
      password: password,
    };
    EventHandler(userData);
  };

  // useEffect(() => {}, []);

  return (
    <Flex flexWrap="wrap" width={['100%', '83.3%']} mx="auto" overflow="hidden">
      <Flex
        flex={['0 0 100%', '0 0 40%']}
        maxWidth={['100%', '40%']}
        p={['20px 40px', '0 50px']}
        backgroundColor="#202020"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        borderRadius={['15px 15px 0 0', '40px 0 0 40px']}
      >
        <Box as="img" src={hlogo} maxWidth="100%" />
      </Flex>
      <Box
        flex={['0 0 100%', '0 0 60%']}
        maxWidth={['100%', '60%']}
        py="10px"
        px={['10px', '50px']}
        textAlign="center"
        border="1px solid #ddd"
        borderLeft={['1px solid #ddd', 'none']}
        borderTop={['none', '1px solid #ddd']}
        borderRadius={['0 0 15px 15px', '0 40px 40px 0']}
      >
        {/* Login Header */}
        <Box mt={[2, 4]}>
          <Text fontSize={['24px', '28px']} fontWeight="600" display="block" mb={[2, 4]}>
            {SigninOrUp}
          </Text>
          <Text fontSize={['10  px', '14px']} fontWeight="500" display="block" mb={[1, 3]}>
            Please check that you are visiting the correct URL
          </Text>
          <a
            href="https://accounts.pimycapital.com"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Text fontSize={['14px', '16px']} mb={[3]} _hover={{ textDecoration: 'underline' }}>
              <Text color="#2dce89">
                <i className="fa fa-lock"></i> https://
              </Text>
              accounts.pimycapital.com
            </Text>
          </a>
        </Box>
        {/* Login Form */}
        <FormControl textAlign="left" fontSize={['14px', '16px']} mt={[1, 3]}>
          <Box borderBottom="1px solid #ced4da">
            <Box
              as="button"
              fontSize={['14px', '16px']}
              padding="10px"
              backgroundColor="transparent"
              border="none"
              outline="none"
              cursor="pointer"
              marginBottom="-1px"
              borderBottom={index === 'email' ? '2px solid #f4bc14' : 'none'}
              onClick={() => setindex('email')}
            >
              Email
            </Box>
            <Box
              as="button"
              fontSize={['14px', '16px']}
              padding="10px"
              backgroundColor="transparent"
              border="none"
              outline="none"
              cursor="pointer"
              marginBottom="-1px"
              borderBottom={index === 'mobile' ? '2px solid #f4bc14' : 'none'}
              onClick={() => setindex('mobile')}
            >
              Mobile
            </Box>
          </Box>
          {isEmpty(Errors.success) ? null : (
            <Box
              mt="10px"
              backgroundColor="#d4edda"
              color="#155724"
              border="1px solid #c3e6cb"
              borderRadius="0.25rem"
              p="10px"
            >
              {Errors.success}
            </Box>
          )}
          {isEmpty(Errors.failed) ? null : (
            <Box
              mt="10px"
              backgroundColor="#fff3cd"
              color="#ffeeba"
              border="1px solid #c3e6cb"
              borderRadius="0.25rem"
              p="10px"
            >
              {Errors.failed}
            </Box>
          )}
          <FormLabel mt="10px">Email:</FormLabel>
          <Input
            fontSize={['14px', '16px']}
            _focus={{ boxShadow: '0 0 0 0.2rem #007bff40' }}
            borderColor="#ced4da"
            py="20px"
            borderRadius="0.25rem"
            onChange={e => setUserName(e.target.value)}
            name="email"
          />
          {isEmpty(Errors.email) ? null : (
            <Box
              mt="10px"
              backgroundColor="#f8d7da"
              color="#721c24"
              border="1px solid #f5c6cb"
              borderRadius="0.25rem"
              p="10px"
            >
              {Errors.email}
            </Box>
          )}
          <FormLabel mt="10px">Password:</FormLabel>
          <Input
            fontSize={['14px', '16px']}
            _focus={{ boxShadow: '0 0 0 0.2rem #007bff40' }}
            borderColor="#ced4da"
            borderRadius="0.25rem"
            py="20px"
            onChange={e => setPassword(e.target.value)}
            type="password"
            name="password"
          />
          {isEmpty(Errors.password) ? null : (
            <Box
              mt="10px"
              backgroundColor="#f8d7da"
              color="#721c24"
              border="1px solid #f5c6cb"
              borderRadius="0.25rem"
              p="10px"
            >
              {Errors.password}
            </Box>
          )}
          <Box
            fontSize={['14px', '16px']}
            fontWeight="bold"
            as="input"
            width="100%"
            type="submit"
            value={SigninOrUp}
            backgroundColor="#f5bc13"
            border="none"
            outline="none"
            cursor="pointer"
            my="10px"
            py="16px"
            borderRadius="0.25rem"
            transition="all ease .2s"
            _focus={{ boxShadow: '0 0 0 0.2rem #007bff40' }}
            onClick={SigninOrUp === 'Log in' ? onLogin : onRegister}
          />
          <Flex flexWrap="wrap" justifyContent="center" alignItems="center" py="10px">
            <GoogleLogin
              clientId="560868151547-5aoj7i6nl5c074d4v7ta29nv2spkam8r.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            {SigninOrUp === 'Log in' ? (
              <Box
                as="a"
                href="/register"
                color="#007bff"
                textDecoration="none"
                px="10px"
                pt="10px"
                transition="color ease .2s"
                _hover={{ color: '#0056b3' }}
              >
                <strong>Register</strong>
              </Box>
            ) : null}
          </Flex>
        </FormControl>
        {/* Login Footer */}
        <Flex borderTop="1px solid #ced4da" flexWrap="wrap" pt="20px">
          <Box
            flex={['0 0 100%', '0 0 50%']}
            maxWidth={['100%', '50%']}
            mt="10px"
            fontSize={['10px', '12px']}
            textAlign={['center', 'left']}
          >
            Lorem ipsum dolor sit amet.
          </Box>
          <Box
            flex={['0 0 100%', '0 0 50%']}
            maxWidth={['100%', '50%']}
            mt="10px"
            fontSize={['10px', '12px']}
            textAlign={['center', 'right']}
          >
            Lorem ipsum dolor sit amet.
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LoginForm;
