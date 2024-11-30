import { ChangeEvent } from "react";

interface TaskFromProps {
  formTitle: string;
  title: string;
  content: string;
  checked: boolean;
  setTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  setContent: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  setChecked: () => void;
  handleClick: () => void;
}

export const TaskForm = ({
  formTitle,
  title,
  content,
  checked,
  setTitle,
  setContent,
  setChecked,
  handleClick,
}: TaskFromProps) => {
  return (
    <div className="text-zinc-900">
      <div className="max-w-xl mx-auto bg-white py-5 rounded-lg">
        <h1 className="font-extrabold text-3xl text-center mb-4">
          {formTitle}
        </h1>
        <input
          type="text"
          placeholder="Add a title..."
          className="border-4 border-zinc-900 p-3 block mt-3 w-96 mx-auto rounded-lg"
          value={title || ""}
          readOnly={formTitle === "Edit this task" ? true : false}
          onChange={setTitle}
        />
        <textarea
          rows={5}
          placeholder="Add content..."
          className="border-4 border-zinc-900 p-3 block mt-3 w-96 mx-auto rounded-lg"
          value={content || ""}
          readOnly={formTitle === "Edit this task" ? true : false}
          onChange={setContent}
        ></textarea>
        <div className="text-center mt-4">
          <input
            type="checkbox"
            id="checkbox"
            className="w-5 h-5"
            checked={checked || false}
            readOnly={formTitle === "Edit this task" ? true : false}
            onChange={setChecked}
          />
          <label htmlFor="checkbox" className="text-2xl pl-2">
            Publish?
          </label>
        </div>

        <button
          onClick={handleClick}
          className="bg-zinc-900 text-white text-xl py-3 px-5 block mx-auto mt-3 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
