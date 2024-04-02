import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { ThreeCircles} from 'react-loader-spinner';
import Reviews from "./Reviews";

const Detail = () => {
  const {id} = useParams();

  const [mdetail, setMdetail] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rated: 0,
    rating: 0
  });

  const [loading, setLoading] =useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "Movies", id);
      const poster_data = await getDoc(_doc);
      setMdetail(poster_data.data());
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row md:item-start justify-center w-full">
      {loading ? <div className="w-full flex justify-center items-center h-96"><ThreeCircles height={40} color="white"/></div> :
      <>
      <img className="h-96 md:sticky top-24" src={mdetail.image} />
      <div className="md:ml-6 ml-0 w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-500">
          {mdetail.title} <span className="text-xl">({mdetail.year})</span>
        </h1>
        <ReactStars
          className="mt-1"
          size={20}
          half={true}
          value={mdetail.rating/mdetail.rated}
          edit={false}
        />
        <p className="mt-3 text-justify">{mdetail.description}</p>
        <Reviews id={id} prevRating={mdetail.rating} userRated={mdetail.rated} />
      </div>
      </>
}
    </div>
  );
};

export default Detail;
