import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/login`,
      captainData
    );

    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem('token', data.token)
      setCaptain(data.captain);
      navigate('/captain-home')
    }

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <form
          onSubmit={(e) => submitHandler(e)}
          className="flex flex-col w-1/4 gap-4  p-3"
        >
          <h2 className="text-3xl font-semibold">What's our captains email</h2>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name=""
            id=""
            placeholder="email here"
            className="p-2 outline-none placeholder:text-sm bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
          />
          <h2 className="text-3xl font-semibold">Enter Password</h2>
          <input
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password here"
            className="p-2 outline-none placeholder:text-sm bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
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
          <Link to="/captain-signup" className="text-blue-500">
            Register as a Captain
          </Link>
        </p>
        <Link to="/login" className="w-1/4">
          <button className="text-xl w-full py-2 mt-20 text-white bg-orange-400 font-semibold cursor-pointer  hover:bg-emerald-600">
            Sign in as User
          </button>
        </Link>
      </div>
    </>
  );
}

export default CaptainLogin;
