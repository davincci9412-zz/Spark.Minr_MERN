import React, { useRef } from 'react';
import { Box, Text, Flex } from '@blockstack/ui';

import sortTable from '../tableFunction';

const WalletsTracked = ({ TableContents }) => {
  const trackedTable = useRef(null);

  return (
    <Box mt="30px">
      <Box mb="20px" overflowX="auto">
        <Text fontSize={['20px', '24px']} fontWeight="500">
          Wallets Tracked
        </Text>
      </Box>
      <Box overflowX="auto">
        <Box
          as="table"
          ref={trackedTable}
          className="token_table"
          fontSize={['10px', '12px']}
          minWidth="750px"
        >
          <thead>
            <tr>
              {['Wallet', 'Description'].map((elem, key) => {
                return (
                  <th key={key} colSpan={key === 0 ? '3' : '2'}>
                    <Flex alignItems="center" fontWeight="bold" textAlign="center">
                      {elem}
                      &nbsp;
                      <Box>
                        <Box
                          as="button"
                          display="block"
                          cursor="pointer"
                          backgroundColor="black"
                          width="12px"
                          height="12px"
                          border="none"
                          transition="all ease .2s"
                          style={{ clipPath: 'polygon(50% 0, 0 86.6%, 100% 86.6%)' }}
                          _focus={{ outline: 'none' }}
                          _hover={{ backgroundColor: '#999' }}
                          onClick={() => sortTable('asc', key * 3, trackedTable.current)}
                        />
                        <Box
                          as="button"
                          display="block"
                          cursor="pointer"
                          backgroundColor="black"
                          width="12px"
                          height="12px"
                          border="none"
                          transition="all ease .2s"
                          style={{ clipPath: 'polygon(50% 100%, 0 13.4%, 100% 13.4%)' }}
                          _focus={{ outline: 'none' }}
                          _hover={{ backgroundColor: '#999' }}
                          onClick={() => sortTable('desc', key * 3, trackedTable.current)}
                        />
                      </Box>
                    </Flex>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {TableContents.map((row, key) => (
              <tr key={key}>
                <td style={{ borderRight: 'none' }}>
                  <Text>{row[0]}</Text>
                </td>
                <td style={{ borderLeft: 'none', borderRight: 'none' }}>
                  <Box
                    as="button"
                    backgroundColor="transparent"
                    cursor="pointer"
                    border="none"
                    _focus={{ outline: 'none' }}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {row[1] === 1 ? 'Add Alias' : 'View Wallet ID'}
                  </Box>
                </td>
                <td style={{ borderLeft: 'none' }}>
                  <Box
                    as="button"
                    backgroundColor="transparent"
                    cursor="pointer"
                    border="none"
                    _focus={{ outline: 'none' }}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Remove
                  </Box>
                </td>
                <td style={{ borderRight: 'none' }}>
                  <Text>{row[2]}</Text>
                </td>
                <td style={{ borderLeft: 'none' }}>
                  <Box
                    as="button"
                    backgroundColor="transparent"
                    cursor="pointer"
                    border="none"
                    _focus={{ outline: 'none' }}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Set Notification &nbsp;
                    <Text className="fa fa-bell-o"></Text>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>
    </Box>
  );
};

export default WalletsTracked;
