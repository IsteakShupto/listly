import { ChangeEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";

interface Props {
  heading: string;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePass: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  footer: string;
  linkText: string;
  textType: string;
}

export const Auth = ({
  heading,
  handleEmail,
  handlePass,
  handleClick,
  footer,
  linkText,
  textType,
}: Props) => {
  return (
    <div className="mt-4 mb-9">
      <div className="flex flex-col max-w-xl mx-auto bg-white text-zinc-800 rounded-md p-4">
        <h1 className="font-extrabold text-3xl text-center">{heading}</h1>
        <div className="px-11">
          <label
            htmlFor="email"
            className="flex flex-col mb-2 text-xl font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ex. email@gmail.com"
            className="w-full border-2 px-3 py-1 rounded-md border-zinc-800"
            onChange={handleEmail}
          />
        </div>
        <div className="px-11 mt-2">
          <label
            htmlFor="password"
            className="flex flex-col mb-2 text-xl font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="********"
            className="w-full border-2 px-3 py-1 rounded-md border-zinc-800"
            onChange={handlePass}
          />
        </div>
        <button
          className="bg-zinc-800 text-white w-10/12 mx-auto mt-4 p-2 rounded-md shadow-sm"
          onClick={handleClick}
        >
          Submit
        </button>
        <h1 className="text-center mt-2">
          {footer}{" "}
          <Link to={`/${textType}`} className="text-zinc-800 font-semibold">
            {linkText}
          </Link>
        </h1>
      </div>
    </div>
  );
};
