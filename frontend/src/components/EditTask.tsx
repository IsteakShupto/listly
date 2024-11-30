import { useEffect, useState } from "react";
import { URL } from "../config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TaskForm } from "./TaskForm";
import { useTodo } from "../hooks";
import { Loader } from "./Loader";

export const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const { loading, todo } = useTodo(id as string);

  useEffect(() => {
    setTitle(todo?.title as string);
    setContent(todo?.content as string);
    setChecked(todo?.published as boolean);
  }, [todo]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const handleClick = async () => {
    try {
      await axios.put(
        `${URL}/api/v1/task/${id}/edit`,
        {
          title,
          content,
          published: checked,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      navigate(`/todos/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TaskForm
      formTitle="Edit this task"
      title={title}
      content={content}
      checked={checked}
      setTitle={(e) => setTitle(e.target.value)}
      setContent={(e) => setContent(e.target.value)}
      setChecked={() => {
        setChecked(!checked);
      }}
      handleClick={handleClick}
    />
  );
};
