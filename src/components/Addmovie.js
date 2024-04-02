import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/Firebase";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const Addmovie = () => {
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    image: "",
    rated: 0,
    rating: 0,
  });
  const [loading, setLoading] = useState(false);
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();

  const addMovie = async () => {
    setLoading(true);
    try {
      if (useAppstate.login) {
        await addDoc(moviesRef, form);
        swal({
          title: "Successfully Added",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setForm({
          title: "",
          year: "",
          image: "",
          description: ""
        });

      } else {
        swal({
          title: "To add movies, please first do login.",
          icon: "error",
          buttons: false,
          timer: 3000,
        });
        navigate("/login");
      }
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
    //tailblocks.cc for forms
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-6">
            <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-white">
              Add Movie
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="title" class="leading-7 text-md text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    class="w-full bg-white rounded border-2 border-red-800
                     focus:border-lime-800
                       focus:ring-1 focus:ring-lime-800 
                      text-base outline-none text-black py-1 px-3 
                      leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="year" class="leading-7 text-md text-white">
                    Year
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    class="w-full bg-white rounded border-2 border-red-800
                     focus:border-lime-800
                       focus:ring-1 focus:ring-lime-800 
                      text-base outline-none text-black py-1 px-3 
                      leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="image" class="leading-7 text-md text-white">
                    Image Link
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    class="w-full bg-white rounded border-2 border-red-800
                     focus:border-lime-800
                       focus:ring-1 focus:ring-lime-800 
                      text-base outline-none text-black py-1 px-3 
                      leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-md text-white">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.dsecription}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    class="w-full bg-white rounded border-2
                     border-red-800 focus:border-lime-800
                       focus:ring-1 focus:ring-lime-800
                      h-32 text-base outline-none text-black py-2 px-3 
                      resize-none leading-6 transition-colors duration-200 
                      ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={addMovie}
                  class="flex mx-auto text-white bg-red-700 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg transition ease-in-out duration-200"
                >
                  {loading ? <TailSpin height={25} color="white" /> : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addmovie;
