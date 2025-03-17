import React from 'react'
import { MdOutlineSpeed } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiTimer } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { FaRegNoteSticky } from "react-icons/fa6";

function CaptainDetails() {
  return (
    <>
        <div className="w-[40%] mx-4 my-20">
          <Link to="/home" className="fixed text-3xl top-4 left-16 font-bold">
            Uber
          </Link>
          <Link to="/captain-login" className="fixed top-4 right-16">
            <IoExitOutline size={35} />
          </Link>
          <div className="flex justify-between items-center mb-6">
            <div className="flex justify-between items-center gap-4">
              <div className="p-2 bg-gray-200 rounded-full ">
                <img
                  className="h-10"
                  src="https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png"
                  alt=""
                />
              </div>
              <h1 className="text-xl font-medium">Rahul </h1>
            </div>
            <div>
              <h1 className="text-lg font-medium">Rs.265.20</h1>
              <p className="text-gray-600">Earned</p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-md p-4 mt-12   flex justify-between items-center w-full">
            <div className="flex flex-col items-center gap-1">
              <h1>
                <CiTimer size={25} />
              </h1>
              <p className="text-lg font-medium">10.2</p>
              <p className="text-gray-600">Hourse Online</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1>
                <MdOutlineSpeed size={25} />
              </h1>
              <p className="text-lg font-medium">10.2</p>
              <p className="text-gray-600">Hourse Online</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1>
                <FaRegNoteSticky size={25} />
              </h1>
              <p className="text-lg font-medium">10.2</p>
              <p className="text-gray-600">Hourse Online</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default CaptainDetails