import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import {Grid} from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore'
import { moviesRef } from "../firebase/Firebase";
import { Link } from "react-router-dom";

const Card = () => {
  const [mdata, setMdata] = useState([]);
  const [loading, setLoading] =useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const dbdata = await getDocs(moviesRef);
      dbdata.forEach((doc) => {
        setMdata((prev) => [...prev, {...(doc.data()), id: doc.id}])
      });
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-around px-3 mt-2 sm:basis-1">
      {loading ? <div className="w-full flex justify-center items-center h-96"><Grid height={50} color="white"/></div> : 
      mdata.map((e, i) => {
        return (
          <Link to={`/detail/${e.id}`}>
          <div
            key={i}
            className="card shadow-lg shadow-gray-800 p-2 cursor-pointer hover:-translate-y-3 transition-all duration-500 mt-5"
          >
            <img className="h-60 md:h-72" src={e.image} alt="" />
            <h1>
              {e.title}
            </h1>
            <h1>
              <span className="text-neutral-400">Year:</span> {e.year}
            </h1>
            <h1 className="flex items-center">
              <span className="text-neutral-400 mr-1">Rating:</span>
              <ReactStars size={20} half={true} value={e.rating/e.rated} edit={false} />
            </h1>
          </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Card;
