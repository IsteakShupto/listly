import { useState } from "react";
import { Auth } from "./Auth";
import { URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    await axios.post(`${URL}/api/v1/user/signup`, {
      email: email,
      password: pass,
    });

    navigate("/");
  };

  return (
    <div>
      <Auth
        heading="Create an account"
        handleEmail={(e) => setEmail(e.target.value)}
        handlePass={(e) => setPass(e.target.value)}
        handleClick={handleClick}
        footer="Aleady have an account?"
        linkText="Sign in"
        textType=""
      />
    </div>
  );
};
