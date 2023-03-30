import React, { Component } from 'react';
import {Center, Heading, Text, VStack, Box} from "@chakra-ui/react";
import {Button, Container} from "reactstrap";
import {Link} from "react-router-dom";


export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <Box bg="gray.50">
          <Container maxW="container.lg">
            <Center p={4} minHeight="70vh">
              <VStack>
                <Container maxW="container.md" textAlign="center">
                  <Heading size="2xl" mb={4} color="gray.700">
                    Our videos are really cool.
                  </Heading>

                  <Text fontSize="xl" color="gray.500">
                   Best propaganda since Stalin.
                  </Text>

                    <Link   to="/videos">
                        <Button mt={8} colorScheme="brand" >
                            Search videos →
                        </Button>
                    </Link>
                </Container>
              </VStack>
            </Center>
          </Container>
        </Box>
    );
  }
}