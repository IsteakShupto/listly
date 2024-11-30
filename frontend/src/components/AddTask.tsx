import { useState } from "react";
import { URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TaskForm } from "./TaskForm";

export const AddTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${URL}/api/v1/task`,
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

      navigate(`/todos/${response.data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TaskForm
      formTitle="Add a task"
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
