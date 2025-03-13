import React from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <>
      <div className="h-screen w-full flex justify-between ">
        <div className="bg-white flex flex-col gap-4 pl-30 pt-66 pr-4">
            <p className="text-4xl font-semibold">Go Anywhere With Uber</p>
            <h2 className="text-3xl font-normal">Get Started With Uber</h2>
            <Link to='/login'><button className="text-3xl px-4 py-2 rounded-lg text-white bg-black/80 font-semibold cursor-pointer  hover:bg-black/60">Continue</button></Link>
        </div>
        <div className="mt-10 pr-40">
            <img className="h-[90vh] w-[40vw] object-fit" src="https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
      </div>
    </>
  );
}

export default Start;
