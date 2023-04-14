import React, { Component } from 'react';
import { Center, Heading, VStack, Box, Input, HStack, Button } from '@chakra-ui/react';
import {Link} from "react-router-dom";


export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <Box bg="gray.50">

            <Center p={4} minHeight="70vh">
              <VStack>

                  <Heading size="2xl" mb={4} color="gray.700">
                    Co chcesz obejrzeć ?
                  </Heading>
                  <HStack>

                    <Input
                    type={'text'} variant='outline' backgroundColor={'white'}/>
                    <Link   to="/videos">
                        <Button colorScheme='blue' >
                            Wyszukaj
                        </Button>
                    </Link>
                  </HStack>

              </VStack>
            </Center>

        </Box>
    );
  }
}