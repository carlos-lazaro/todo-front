import { Category, Todo } from "@/interfaces";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { StateTodoRadioButton, env } from "@/constant";
import { useFetch } from "@/hooks";

const initTodo = {
  user: "",
  title: "",
  description: "",
  status: 10,
  categories: [],
  _id: undefined,
};

interface Props {
  todo?: Todo;
}

function Index({ todo = initTodo }: Props) {
  console.log(todo);
  const [newTodo, setNewTodo] = useState<Partial<Todo>>(todo ?? initTodo);
  const [status, setStatus] = useState(todo?.status?.toString());
  const [categories, setCategories] = useState<(string | undefined)[]>(
    (todo?.categories?.map((item) => {
      return item._id;
    }) as any) ?? []
  );

  console.log(categories);

  const { data, error, loading, refetch } = useFetch<{
    categories: Category[];
  }>(`${env.baseUrl}/categories`);

  const handleStateChange = (e: string) => {
    setStatus(e);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodo?.title?.trim() === "") {
      alert("Please enter a title for the Todo.");
      return;
    }

    await fetch(`${env.baseUrl}/todos${todo._id ? `/${todo._id}` : ""}`, {
      method: todo._id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newTodo, status, categories: categories }),
    })
      .then(async (res) => {
        console.log(res);
        if (!res.ok) {
          const data = await res.json();
          console.log(data);
          throw new Error();
        }

        const data = await res.json();

        console.log(data);

        if (data.todo) {
          alert("Todo created.");
        }
      })
      .catch((e) => {
        alert("Failed to create the Todo.");
      });
  };

  return (
    <Card maxW="sm" className="p-4">
      <Heading>Todo</Heading>
      <form onSubmit={handleSubmit} className="text-black">
        <div>
          <label htmlFor="user">User:</label>
          <input
            type="text"
            id="user"
            name="user"
            value={newTodo?.user ?? ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <Input
            id="title"
            name="title"
            value={newTodo.title ?? ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <Textarea
            id="description"
            name="description"
            value={newTodo.description}
            onChange={handleInputChange}
            placeholder="Description"
            size="sm"
          />
        </div>
        <Divider className="my-4" />
        <RadioGroup value={status} onChange={handleStateChange}>
          <Stack direction="row">
            {StateTodoRadioButton.map(([stateCode, tag]) => {
              return (
                <Radio key={stateCode} value={stateCode}>
                  {tag}
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
        <Divider className="my-4" />
        <div>
          {data?.categories.map((category) => {
            return (
              <Checkbox
                key={category._id}
                className="m-2"
                isChecked={categories.indexOf(category._id) >= 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCategories([...categories, category._id]);
                  } else {
                    setCategories([
                      ...categories.filter((item) => item !== category?._id),
                    ]);
                  }
                  console.log(e.target.checked);
                  console.log(e);
                }}
              >
                {category.title}
              </Checkbox>
            );
          })}
        </div>
        <Divider className="my-4" />
        <Button type="submit" colorScheme="blue">
          {todo && todo?._id ? "Update" : "Create"}
        </Button>
      </form>
    </Card>
  );
}

export default Index;
