import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import NextLink from "next/link";

function Header() {
  return (
    <Box boxShadow="md" bg="blue.500" color="white" p={4}>
      <Flex align="center">
        <Heading size="md">Todo App</Heading>
        <Spacer />
        <Flex gap={4}>
          <Link href="/todo/list">Home</Link>
          <Link href="/todo/create">Create Todo</Link>
          <Link href="/user/singin">Singin</Link>
          <Link href="/user">Singup</Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
