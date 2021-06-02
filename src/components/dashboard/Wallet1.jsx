import React, { useRef } from 'react';
import { Box, Text, Flex } from '@blockstack/ui';

import sortTable from './tableFunction';

const Wallet1 = ({ WalletName, TableContents }) => {
  const walletTable = useRef(null);

  return (
    <Box mt="30px">
      <Box mb="20px" overflowX="auto">
        <Text fontSize={['20px', '24px']} fontWeight="500" mr="10px">
          {WalletName}
        </Text>
        <Box
          as="button"
          backgroundColor="transparent"
          cursor="pointer"
          mx="10px"
          border="none"
          fontSize={['12px', '14px']}
          _focus={{ outline: 'none' }}
          _hover={{ textDecoration: 'underline' }}
        >
          <Text className="fa fa-remove" />
          &nbsp;Remove
        </Box>
        <Box
          as="button"
          backgroundColor="transparent"
          cursor="pointer"
          mx="10px"
          border="none"
          fontSize={['12px', '14px']}
          _focus={{ outline: 'none' }}
          _hover={{ textDecoration: 'underline' }}
        >
          <Text className="	fa fa-pencil-square-o" />
          &nbsp;Rename
        </Box>
      </Box>
      <Box overflowX="auto">
        <Box
          as="table"
          ref={walletTable}
          className="token_table"
          fontSize={['10px', '12px']}
          minWidth="100%"
        >
          <thead>
            <tr>
              {[
                'Token',
                'QTY',
                'Value',
                'Average acquisitionprice',
                'Price',
                '24h change',
                'Expand positions',
              ].map((elem, key) => {
                return (
                  <th key={key}>
                    <Flex
                      fontWeight="bold"
                      alignItems="center"
                      justifyContent={key === 5 || key === 6 ? 'center' : 'default'}
                    >
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
                          onClick={() => sortTable('asc', key, walletTable.current)}
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
                          onClick={() => sortTable('desc', key, walletTable.current)}
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
                <td>
                  <Text className="fa fa-circle" color={key % 2 === 0 ? '#2dce89' : '#efc35c'} />
                  &nbsp;
                  <Text>{row[0]}</Text>
                </td>
                <td>{row[1]}</td>
                <td>{row[2].toFixed(2)}$</td>
                <td>{row[3].toFixed(2)}$</td>
                <td>{row[4].toFixed(2)}$</td>
                <td>
                  <Box
                    width={['90%', '90%', '90%', '60%']}
                    mx="auto"
                    backgroundColor={row[5] > 0 ? '#affdbe' : '#fc8686'}
                    textAlign="center"
                    py="2px"
                    px="5px"
                    borderRadius="5px"
                  >
                    {row[5]}%
                  </Box>
                </td>
                <td>
                  <Text
                    display="block"
                    width="fit-content"
                    mx="auto"
                    fontSize={['12px', '14px']}
                    className={row[6] === 1 ? 'fa fa-plus-square-o' : '	fa fa-minus-square-o'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>
    </Box>
  );
};

export default Wallet1;
