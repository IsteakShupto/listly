import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState } from "../atoms/atoms";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = useRecoilValue(
    loggedInState || localStorage.getItem("isLoggedIn")
  );

  const setIsLoggedIn = useSetRecoilState(loggedInState);

  return (
    <div className="p-4">
      <div className="bg-white rounded-md shadow-sm flex justify-between py-3 px-5 max-w-xl mx-auto">
        <div className="font-semibold text-zinc-800 text-xl">Listly</div>
        <div className="flex gap-3">
          {!isLoggedIn && (
            <Link to="/" className="font-bold text-zinc-800 underline text-xl">
              Signin
            </Link>
          )}
          {!isLoggedIn && (
            <Link
              to="/signup"
              className="font-bold text-zinc-800 underline text-xl"
            >
              Signup
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/todos"
              className="font-bold text-zinc-800 underline text-xl"
            >
              Todos
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.clear();
                navigate("/");
              }}
              className="font-bold text-zinc-800 underline text-xl"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
