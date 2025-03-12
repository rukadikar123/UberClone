import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ 
        email: email,
        password:password 
    });
    console.log(userData);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col w-1/4 gap-4  p-3"
      >
        <h2 className="text-3xl font-semibold">What's your email</h2>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name=""
          id=""
          placeholder="email here"
          className="p-2 outline-none bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
        />
        <h2 className="text-3xl font-semibold">Enter Password</h2>
        <input
          type="text"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password here"
          className="p-2 outline-none bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
        />
        <button
          type="submit"
          className="text-xl  py-2  text-white bg-black/70 font-semibold cursor-pointer  hover:bg-black/50"
        >
          Login
        </button>
      </form>
      <p className="font-medium text-center">
        New here?{" "}
        <Link to="/signup" className="text-blue-500">
          Create New Account
        </Link>
      </p>
      <Link to='/captain-login' className="w-1/4"><button className="text-xl w-full py-2 mt-20 text-white bg-orange-400 font-semibold cursor-pointer  hover:bg-emerald-600">
      Sign in as Captain
      </button></Link>
    </div>
  );
}

export default UserLogin;
