import { useState } from "react";
import { Auth } from "./Auth";
import axios from "axios";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loggedInState } from "../atoms/atoms";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(loggedInState);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${URL}/api/v1/user/signin`,
        {
          email: email,
          password: pass,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", response.data.token);
      navigate("/todos");
    } catch (err) {
      console.log(err);
      alert("Please provide correct credentials to login!");
    }
  };

  return (
    <div>
      <Auth
        heading="Welcome back"
        handleEmail={(e) => setEmail(e.target.value)}
        handlePass={(e) => setPass(e.target.value)}
        handleClick={handleClick}
        footer="Haven't created an account?"
        linkText="Sign up"
        textType="signup"
      />
    </div>
  );
};
