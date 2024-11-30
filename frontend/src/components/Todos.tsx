import { useTodos } from "../hooks";
import { Loader } from "../components/Loader";
import { Todo, TodoProps } from "./Todo";
import { Link } from "react-router-dom";

export const Todos = () => {
  const { loading, todos } = useTodos();

  if (loading) {
    return (
      <div className="max-w-xl mx-auto">
        <Loader />
      </div>
    );
  }

  return (
    <div className="text-zinc-800">
      <div className="max-w-xl mx-auto bg-white rounded-md">
        <div className="flex justify-between items-center px-8 pt-11">
          <h1 className="text-3xl font-extrabold">Tasks</h1>
          <Link
            to="/addTask"
            className="bg-zinc-800 px-3 py-2 text-white font-extrabold rounded-md"
          >
            Add a task
          </Link>
        </div>
        <div className="py-5 max-w-lg mx-auto">
          {todos &&
            todos.map((todo: TodoProps) => (
              <Link key={todo.id} to={`/todos/${todo.id}`}>
                <Todo
                  id={todo.id}
                  title={todo.title}
                  content={todo.content}
                  published={todo.published}
                  author={todo.author}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
