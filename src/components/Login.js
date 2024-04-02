import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { query, where, getDocs } from "firebase/firestore";
import { userRef } from "../firebase/Firebase";
import bcrypt from "bcryptjs";
import swal from "sweetalert";
import {Appstate} from '../App';

const Login = () => {
  const [logform, setLogform] = useState({
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(userRef, where("mobile", "==", logform.mobile));
      const querySnapShot = await getDocs(quer);
      querySnapShot.forEach((doc) => {
        const userData = doc.data();
        const isUser = bcrypt.compareSync(logform.password, userData.password);
        if (isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(userData.userName);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          navigate('/');
        } else {
          swal({
            title: "Invalid credentials",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        }
      });
    } catch (err) {
      swal({
        title: err,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div className="px-5 py-12 flex flex-wrap items-center">
      <div class="bg-zinc-900 rounded-lg p-6 flex flex-col mx-auto w-full mt-6 lg:w-1/3 md:w-1/2">
        <h2 class="text-2xl mb-5 text-white text-center font-bold">Login</h2>
        <div class="relative mb-4">
          <label for="phone" class="leading-7 text-sm text-gray-300">
            Mobile No.
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={logform.mobile}
            onChange={(e) => setLogform({ ...logform, mobile: e.target.value })}
            class="w-full bg-white rounded border border-red-800 focus:border-lime-800 focus:ring-2 focus:ring-lime-800 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class="relative mb-4">
          <label for="password" class="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={logform.password}
            onChange={(e) =>
              setLogform({ ...logform, password: e.target.value })
            }
            class="w-full bg-white rounded border border-red-800 focus:border-lime-800 focus:ring-2 focus:ring-lime-800 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          onClick={login}
          class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-2 flex justify-center"
        >
          <Link to="/">
            {loading ? <TailSpin height={25} color="white" /> : "Login"}
          </Link>
        </button>
        <p class="text-md text-gray-300 mt-3">
          Do not have account?{" "}
          <Link to="/signin">
            <span className="text-cyan-600 hover:text-blue-300">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
