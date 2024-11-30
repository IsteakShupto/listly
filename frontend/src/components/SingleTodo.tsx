import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTodo } from "../hooks";
import { Loader } from "./Loader";
import { Todo } from "./Todo";
import axios from "axios";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SingleTodo = () => {
  const { id } = useParams();
  const { loading, todo } = useTodo(id as string);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${URL}/api/v1/task/${id}/delete`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      navigate("/todos");
      alert("Your task has been deleted successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-zinc-800">
      <div className="max-w-xl mx-auto bg-white rounded-lg">
        <div className="px-10 pt-10">
          {!loading && todo && (
            <Todo
              id={todo.id}
              title={todo.title}
              content={todo.content}
              published={todo.published}
              author={todo.author}
            />
          )}
        </div>
        <div className="max-w-lg mx-auto pb-4">
          <div className="p-4 shadow-md rounded-md">
            <h1 className="text-3xl font-extrabold pb-1">Published by</h1>
            <p className="pb-1">{todo?.author.email || "example@gmail.com"}</p>
            <p className="pb-1">{todo?.author.username || "Anonymous"}</p>
            <p>
              {todo?.author.address || "Road no. example / house # anonymous"}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Link to={`/editTask/${todo?.id}`}>
            <button className="bg-zinc-800 text-white mb-4 px-3 py-2 text-lg rounded-lg">
              Edit this task
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-700 text-white mb-4 ml-3 px-3 py-2 text-lg rounded-lg"
            >
              Delete this task
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
