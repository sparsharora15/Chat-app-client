import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../services/API";
import decodeToken from "../../services/decoder";
import { getUserId } from "../../src/Redux/slice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const [loginDetails, setToginDetails] = useState({ email: "", password: "" });
  const { email, password } = loginDetails;
  const dispatch = useDispatch();
  function handleOnChange(event) {
    setToginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  }
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const response = await userLogin(loginDetails);
      if (response.status === 200) {
        localStorage.setItem("userToken", response.data.token);
        decodeToken(response.data.token)
          .then((result) => {
            if (result.isDecode) {
              dispatch(getUserId(result.deCodedToken.payload._id));
              // setUserId(._id);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        navigate("/");
      }
    } catch (e) {
      toast.error(e.response.data.error, {
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
  }
  return (
    <>
    <div className="bg-[#e9edef] flex w-[90%] h-[70%] sm:w-1/2 flex-col items-center justify-center px-6 py-12 shadow-xl lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
  
      <div className="mt-6 w-full">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                value={email}
                name="email"
                onChange={(e) => handleOnChange(e)}
                type="email"
                autoComplete="email"
                required
                className="block w-full focus:outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
  
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold focus:outline-none">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                value={password}
                type="password"
                onChange={(e) => handleOnChange(e)}
                autoComplete="current-password"
                required
                className="block w-full focus:outline-none p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
  
          <div>
            <button
              onClick={handleSubmit}
              className="flex w-full focus:outline-none focus:bg-[#2a7067] justify-center rounded-md bg-[#449388] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm "
            >
              Sign in
            </button>
          </div>
        </div>
  
        <p className="mt-6 mb-6 text-center text-sm text-gray-500 ">
          Not a member? &nbsp;
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Signup
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  </>
  
  );
};

export default Login;
