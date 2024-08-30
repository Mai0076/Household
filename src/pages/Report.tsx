import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import TodoList from "../pages/TodoList";

const Report = () => {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<string>("");

  const getAllTodos = async () => {
    const todos = await supabase.from("todo").select("*");
    return todos.data;
  };

  const addTodo = async (title: string) => {
    await supabase.from("todo").insert({ title: title });
  };

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
      console.log(todos);
    };
    getTodos();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (title === "") return;

    //Todoの追加
    await addTodo(title);
    let todos = await getAllTodos();
    setTodos(todos);

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="mr-2 shadow-lg p-1 outline-none"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button className="shadow-md border-2 px-1 py-1 rounded-lg bg-green-200">
          Add
        </button>
      </form>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Report;
