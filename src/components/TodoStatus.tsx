import { StateTodo } from "@/constant";
import { Todo } from "@/interfaces";
import { Box, Tag, Tooltip } from "@chakra-ui/react";
import React from "react";

interface Props {
  todo?: Todo;
}
function TodoStatus({ todo }: Props) {
  return (
    <Tooltip label="Status">
      <Box p="1">
        <Tag>{StateTodo.get(todo?.status ?? 0)?.tag}</Tag>
      </Box>
    </Tooltip>
  );
}

export default TodoStatus;
