import React from "react";
import { Todo } from "@/interfaces";
import TodoForm from "@/components/TodoForm";
import { env } from "@/constant";

interface Props {
  todo: Todo;
  id?: string;
  err?: string;
}

function Index({ err, todo, id }: Props): React.JSX.Element {
  if (err) {
    return <div className="p-4">{err}</div>;
  }
  return (
    <div className="p-4 flex h-max justify-center align-middle">
      <TodoForm todo={todo} />
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  if (!params.id) return { props: { err: "Todo not found." } };

  const res = await fetch(`${env.baseUrl}/todos/${params.id}`);

  if (!res.ok) return { props: { err: "Todo not found." } };

  const resJson = await res.json();
  console.log("fuck");
  console.log(resJson);
  console.log(params.id);

  return { props: { todo: resJson.todo, id: params.id } };
}

export default Index;
