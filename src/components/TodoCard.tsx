import { Todo } from "@/interfaces";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import TodoStatus from "./TodoStatus";

interface Props {
  todo?: Todo;
}
function TodoCard({ todo }: Props) {
  return (
    <Card maxW="sm">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">{todo?.title}</Heading>
          <Text>{todo?.description}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justify="space-between" flexWrap="wrap">
        <TodoStatus todo={todo} />
        <Button variant="solid" colorScheme="blue">
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TodoCard;
