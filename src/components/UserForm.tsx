import { Button, Card, Divider, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { env } from "@/constant";

const initTodo = {
  name: "",
  email: "",
  password: "",
};

function Index() {
  const [user, setUser] = useState(initTodo);
  const [userDb, setUserDb] = useState(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await fetch(`${env.baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user }),
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

        if (data.user) {
          alert("User created.");
          setUserDb(data.user);
        }
      })
      .catch((e) => {
        alert("Failed to create the User.");
      });
  };

  return (
    <Card maxW="sm" className="p-4 m-4">
      <Heading>User</Heading>
      {userDb && `user: ${JSON.stringify(userDb)}`}
      <form onSubmit={handleSubmit} className="text-black">
        <div>
          <label htmlFor="name">Name:</label>
          <Input
            id="name"
            name="name"
            value={user.name ?? ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="mail">Email:</label>
          <Input
            id="email"
            name="email"
            value={user.email ?? ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input
            id="password"
            name="password"
            value={user.password ?? ""}
            onChange={handleInputChange}
          />
        </div>
        <Divider className="my-4" />
        <Button type="submit" colorScheme="blue">
          Create
        </Button>
      </form>
    </Card>
  );
}

export default Index;
