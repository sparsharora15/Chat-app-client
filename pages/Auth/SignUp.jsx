import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../src/Redux/slice";
import { toast } from "react-toastify";
const SignUp = () => {
  const dispatch = useDispatch();
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { name, email, password } = registerUser;
  function handleOnChange(e) {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  }
  async function handleClick() {
    const response = await dispatch(register(registerUser));
    if (response?.payload?.msg === "User created successfully") {
      toast.success(response?.payload?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
      return;
    }
    setRegisterUser({ name: "", email: "", password: "" });
    toast.error(response?.payload?.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <>
      <div className="bg-[#e9edef] flex md:w-1/2 w-[80%] flex-col items-center justify-center px-6 py-12 shadow-xl h-[80%] lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your new account
          </h2>
        </div>

        <div className="mt-6 w-full">
          <div className="space-y-6">
            <div className="w-full">
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleOnChange(e)}
                  autoComplete="email"
                  required
                  className="block w-full focus:outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="w-full">
              <label
                for="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Name
              </label>
              <div className="mt-2">
                <input
                  id="text"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => handleOnChange(e)}
                  required
                  className="block w-full focus:outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => handleOnChange(e)}
                  autoComplete="current-password"
                  required
                  className="block w-full focus:outline-none p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full focus:outline-none focus:bg-[#2a7067] justify-center rounded-md bg-[#449388] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm "
                onClick={() => handleClick()}
              >
                Sign up
              </button>
            </div>
          </div>

          <p className="mt-6 mb-6 text-center text-sm text-gray-500">
            Already have an account? &nbsp;
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
