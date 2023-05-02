import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate= useNavigate()
  
  useEffect(()=>{
  const auth = localStorage.getItem("user");
  if(auth)
  {
    navigate("/")
  }
  },[])
  const handleChange = async () => {
    console.log(name, password, email);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
     result = await result.json();
     console.log(result);
     localStorage.setItem("user",JSON.stringify(result.result))
     localStorage.setItem("token",JSON.stringify(result.auth))
    // if(result){
        navigate("/")
    // }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter Name..."
      />
      <input
        className="inputBox"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Enter Email..."
      />
      <input
        className="inputBox"
        name="passsword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter Password..."
      />

      <button onClick={handleChange} className="button" type="button">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
