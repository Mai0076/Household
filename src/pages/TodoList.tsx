import React from "react";
import { supabase } from "../supabase";

interface Todo {
  id: number;
  title: string;
}

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<any>;
};

const getAllTodos = async () => {
  const todos = await supabase.from("todo").select("*");
  return todos.data;
};

const deleteTodo = async (id: number) => {
  await supabase.from("todo").delete().eq("id", id);
};

const TodoList = (props: Props) => {
  const { todos, setTodos } = props;

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    let todos = await getAllTodos();
    setTodos(todos);
  };

  return (
    <div>
      <ul className="mx-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between"
          >
            <li className="font-medium"> {todo.title}</li>
            <span
              className="cursor-pointer"
              onClick={() => handleDelete(todo.id)}
            >
              ✖
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
