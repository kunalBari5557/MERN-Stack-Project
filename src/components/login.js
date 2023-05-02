import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const auth= localStorage.getItem('user')
    if(auth){
        navigate("/")
    }
  },[])

  const handleLogin = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div className="login">
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="inputBox"
        type="text"
        placeholder="Enter email..."
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="inputBox"
        type="password"
        placeholder="Enter password..."
      />
      <button onClick={handleLogin} className="button" type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
