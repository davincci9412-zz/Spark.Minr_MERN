import React, { useState } from 'react';
import { Box, Flex, Text, FormControl, FormLabel, Input } from '@blockstack/ui';
import isEmpty from 'is-empty';

import hlogo from '../../assets/images/logo.png';

const LoginForm = ({ SigninOrUp, EventHandler, Errors }) => {
  
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

  //useEffect(() => {}, []);

  return (
    <Flex flexWrap="wrap" overflow="hidden">
      <Flex
        flex={['0 0 100%', '0 0 40%']}
        maxWidth={['100%', '40%']}
        p={['20px 40px', '0 50px']}
        backgroundColor="#202020"
        border="1px solid #ddd"
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
        borderRadius={['0 0 15px 15px', '0 40px 40px 0']}
      >
        {/* Login Header */}
        <Box mt={[4, 4]} borderBottom="1px solid #ced4da" pb={[4, 4]}>
          <Text fontSize={['24px', '28px']} fontWeight="600" display="block" mb={[2, 2]}>
            {SigninOrUp}
          </Text>
        </Box>
        {/* Login Form */}
        <FormControl textAlign="left" fontSize={['14px', '16px']} mt={[1, 3]}>
          <FormLabel mt="10px">Email:</FormLabel>
          <Input
            fontSize={['14px', '16px']}
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
            backgroundColor="#2dce89"
            border="none"
            outline="none"
            cursor="pointer"
            mt="50px"
            py="10px"
            color="white"
            borderRadius="0.25rem"
            transition="all ease .2s"
            onClick={SigninOrUp === 'Log in' ? onLogin : onRegister}
          />
          <Flex flexWrap="wrap" justifyContent="center" alignItems="center" py="10px">
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
            ) : (
              <Box
                as="a"
                href="/login"
                color="#007bff"
                textDecoration="none"
                px="10px"
                pt="10px"
                transition="color ease .2s"
                _hover={{ color: '#0056b3' }}
              >
                <strong>Log in</strong>
              </Box>
            ) }
          </Flex>
          
        </FormControl>
        {/* Login Footer */}
        <Flex borderTop="1px solid #ced4da" flexWrap="wrap" pt="20px"mb={[3, 3]}>          
        </Flex>
      </Box>
    </Flex>
  );
};

export default LoginForm;
