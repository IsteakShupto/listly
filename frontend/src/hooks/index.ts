import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../config";
import { TodoProps } from "../components/Todo";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/task/bulk`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setLoading(false);
        setTodos(response.data.tasks);
      } catch (err) {
        console.log(err);
        alert("Please provide correct credentials!");
      }
    };

    getTodos();
  }, []);

  return { loading, todos };
};

export const useTodo = (id: string) => {
  const [todo, setTodo] = useState<TodoProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await axios.get(
          `${URL}/api/v1/task/${id}/individual`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setLoading(false);
        setTodo(response.data.task);
      } catch (err) {
        console.log(err);
      }
    };

    getTodo();
  }, [id]);

  return { loading, todo };
};
