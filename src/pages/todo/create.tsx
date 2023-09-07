import TodoForm from "@/components/TodoForm";
import { Todo } from "@/interfaces";
import React, { useState } from "react";

function Index() {
  return (
    <div className="p-4 flex h-max justify-center align-middle">
      <TodoForm />
    </div>
  );
}

export default Index;
