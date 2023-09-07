import { Todo } from "@/interfaces";
import {
  Box,
  Button,
  Card,
  CardFooter,
  CircularProgress,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import TodoStatus from "./TodoStatus";
import { useFetch } from "@/hooks";
import { useRouter } from "next/router";
import { env } from "@/constant";

function TodoList() {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push({
      pathname: path,
    });
  };

  const [user, setUser] = useState("");
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("");
  const [date, setDate] = useState("");

  const { data, error, loading, refetch } = useFetch<{ todos: Todo[] }>(
    `${env.baseUrl}/todos/users/${user}`
  );

  const {
    data: dataFrequent,
    error: errorFrequent,
    loading: loadingFrequent,
    refetch: refetchFrequent,
  } = useFetch<{ todos: { _id: string; count: number }[] }>(
    `${env.baseUrl}/todos/users/${user}/group/title`,
    {},
    false
  );

  const {
    data: dataWords,
    error: errorWords,
    loading: loadingWords,
    refetch: refetchWords,
  } = useFetch<{ words: { _id: string; count: number }[] }>(
    `${env.baseUrl}/todos/users/${user}/words/interval`,
    {},
    false
  );

  return (
    <div>
      <Card>
        <Input
          id="user"
          name="user"
          placeholder="user(mongoId)"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />

        <CardFooter justify="space-between" flexWrap="wrap">
          <Box>
            <Button
              className="m-1"
              onClick={() => {
                refetch();
              }}
            >
              refech
            </Button>
            <Button
              className="m-1"
              onClick={() => {
                refetchFrequent();
              }}
            >
              frequents
            </Button>
            <Button
              className="m-1"
              onClick={() => {
                refetchWords();
              }}
            >
              words
            </Button>
          </Box>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleClick("/todo/create");
            }}
          >
            Create
          </Button>
        </CardFooter>
      </Card>
      <div className="flex flex-row m-2">
        {dataFrequent?.todos?.map((item) => {
          return (
            <Tooltip label="Status" key={item._id}>
              <Box p="1">
                <Tag>
                  {item._id}: {item.count}
                </Tag>
              </Box>
            </Tooltip>
          );
        })}
      </div>
      <div className="flex flex-row m-2">
        {dataWords?.words?.map((item) => {
          return (
            <Tooltip label="Status" key={item._id}>
              <Box p="1">
                <Tag>
                  {item._id}: {item.count}
                </Tag>
              </Box>
            </Tooltip>
          );
        })}
      </div>
      {loading && <CircularProgress value={80} />}

      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th>Categories</Th>
              <Th>{"-"}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.todos?.map((todo) => {
              return (
                <Tr key={todo._id}>
                  <Td>{todo.title}</Td>
                  <Td>
                    <TodoStatus todo={todo} />
                  </Td>
                  <Td>
                    {todo.categories?.map((category) => {
                      return <Tag key={category._id}>{category.title}</Tag>;
                    })}
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        handleClick(`/todo/${todo._id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TodoList;
