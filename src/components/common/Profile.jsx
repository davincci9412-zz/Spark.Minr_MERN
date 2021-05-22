import React, { useState } from 'react';
import Avatar from '../../assets/images/New folder/Asset 4@2x.png';
import { Flex, Text, Box } from '@blockstack/ui';

const Profile = ({ username, onLogout }) => {
  const [show, setShow] = useState('false');

  const onToggle = () => {
    if (show === 'true') setShow('false');
    else setShow('true');
  };

  return (
    <Flex
      flexWrap="wrap"
      color="white"
      alignItems="center"
      position="absolute"
      right="10px"
      height="55px"
    >
      <Box
        as="button"
        color="white"
        backgroundColor="transparent"
        cursor="pointer"
        border="none"
        mr="10px"
        _focus={{ outline: 'none' }}
        _hover={{ color: '#ddd' }}
        _active={{ color: '#ccc' }}
        display={['none', 'inline-block']}
      >
        Connect Wallet
      </Box>
      <Text display={['none', 'inline-block']}>{username}</Text>&nbsp;
      <Box
        as="button"
        color="white"
        backgroundColor="transparent"
        cursor="pointer"
        border="none"
        _focus={{ outline: 'none' }}
        onClick={onToggle}
      >
        <Box as="img" src={Avatar} alt="avatar" width="30px"></Box>
      </Box>
      <Flex
        position="absolute"
        right="-10px"
        backgroundColor="#13161b"
        opacity=".9"
        top="55px"
        width="180px"
        height={show === 'true' ? '80px' : '0'}
        transition="height ease .2s"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        borderRadius="0 0 5px 5px"
      >
        <Box
          as="button"
          color="white"
          backgroundColor="transparent"
          cursor="pointer"
          border="1px solid white"
          padding="8px 20px"
          _focus={{ outline: 'none' }}
          _hover={{ backgroundColor: 'white', color: '#13161b' }}
          _active={{ color: '#ccc' }}
          transition="all ease .2s"
          onClick={onLogout}
        >
          Log Out
        </Box>
      </Flex>
    </Flex>
  );
};

export default Profile;
