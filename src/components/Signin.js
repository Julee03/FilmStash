import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import swal from "sweetalert";
import { auth } from "../firebase/Firebase";
import bcrypt from 'bcryptjs';
import { userRef } from "../firebase/Firebase";
import { addDoc } from "firebase/firestore";

const Signin = () => {
  const [logform, setLogform] = useState({
    userName: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          signInWithPhoneNumber();
        },
      }
    );
  };

  const requestOtp = () => {
    
    setLoading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${logform.mobile}`, appVerifier)
      .then((confirmResult) => {
        window.confirmationResult = confirmResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setOtpSent(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyOTP = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate('/login')
        setLoading(false); 
      })
    } catch (error) {
      console.log(error);
    }
  }

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(logform.password, salt);
      await addDoc(userRef, {
        userName: logform.userName,
        password: hash,
        mobile: logform.mobile
      });
    } catch(err) {
      console.log(err);
    }
  }


  return (
    <div className="px-5 py-10 flex flex-wrap items-center">
      {otpSent ? (
        <div class="bg-zinc-900 rounded-lg p-6 flex flex-col mx-auto w-full mt-6 lg:w-1/3 md:w-1/2">
          <h2 class="text-2xl mb-5 text-white text-center font-bold">
            Sign Up
          </h2>
          <div class="relative mb-4">
            <label for="phone" class="leading-7 text-sm text-gray-300">
              OTP (One Time Password)
            </label>
            <input
              id="otp"
              name="otp"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              class="w-full bg-white rounded border border-red-800 focus:border-lime-800 focus:ring-2 focus:ring-lime-800 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button 
          onClick={verifyOTP}
          class="text-white bg-indigo-500 border-0 py-2 px-8 mt-2 focus:outline-none hover:bg-indigo-600 rounded text-lg flex justify-center">
            {loading ? <TailSpin height={25} color="white" /> : "Confirm OTP"}
          </button>
          <p class="text-md text-gray-400 mt-3">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-cyan-600 hover:text-blue-300">Login</span>
              </Link>
            </p>
        </div>
      ) : (
        <>
          <div class="bg-zinc-900 rounded-lg p-6 flex flex-col mx-auto w-full mt-6 lg:w-1/3 md:w-1/2">
            <h2 class="text-2xl mb-5 text-white text-center font-bold">
              Sign Up
            </h2>
            <div class="relative mb-4">
              <label for="full-name" class="leading-7 text-sm text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                value={logform.userName}
                onChange={(e) =>
                  setLogform({ ...logform, userName: e.target.value })
                }
                class="w-full bg-white rounded border border-red-800 focus:border-lime-800 focus:ring-2 focus:ring-lime-800 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="phone" class="leading-7 text-sm text-gray-300">
                Mobile No.
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={logform.mobile}
                onChange={(e) =>
                  setLogform({ ...logform, mobile: e.target.value })
                }
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
              onClick={requestOtp}
              class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg flex justify-center"
            >
              {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
            </button>
            <p class="text-md text-gray-400 mt-3">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-cyan-600 hover:text-blue-300">Login</span>
              </Link>
            </p>
            <div id="recaptcha-container"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Signin;
