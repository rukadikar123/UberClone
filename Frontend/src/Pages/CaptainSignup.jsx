import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function CaptainSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState({firstName:'', lastName:''});
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
      fullName:fullName
    });
    

    setEmail("");
    setPassword("");
    setFullName({firstName:'', lastName:''})
  };


  return (
    
    <div className="h-screen w-full flex flex-col items-center  justify-center">
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col w-1/3 gap-5  p-3"
      >
        <h2 className="text-2xl font-semibold">What's our captains Name</h2>
        <div className="flex gap-2  ">
          <input
            type="text"
            required
            name=""
            id=""
            value={fullName.firstName}
            onChange={(e)=>setFullName({...fullName,firstName:e.target.value })}
            placeholder="FirstName"
            className="p-2 outline-none w-full placeholder:text-sm bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
          />
          <input
            type="text"
            required
            name=""
            id=""
            value={fullName.lastName}
            onChange={(e)=>setFullName({...fullName,lastName:e.target.value })}
            placeholder="LastName"
            className="p-2 outline-none w-full placeholder:text-sm bg-gray-200 border border-gray-400 hover:border-gray-700 hover:border-2"
          />
        </div>

        <h2 className="text-2xl font-semibold">What's our captains email</h2>
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
        <h2 className="text-2xl font-semibold">Enter Password</h2>
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
          SignUp
        </button>
      </form>
      <p className="font-medium text-center">
        Already have account?{" "}
        <Link to="/captain-login" className="text-blue-500">
          Login here 
        </Link>
      </p>
       
    </div>
  )
}

export default CaptainSignup