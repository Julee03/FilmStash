import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewRef, db } from "../firebase/Firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const Reviews = ({ id, prevRating, userRated }) => {
  const useAppstate = useContext(Appstate);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reveiwLoading, setReviewLoading] = useState(false);
  const [inputrev, setInputrev] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const [newReview, setNewReview] = useState(0); 

  const navigate = useNavigate();

  const sendReview = async () => {
    setLoading(true);
    try {
      if(useAppstate.login){
      await addDoc(reviewRef, {
        movie_id: id,
        name: useAppstate.userName,
        thought: inputrev,
        rating: rating,
        timestamp: new Date().getTime(),
      });

      const reviewdocref = doc(db, "Movies", id);
      await updateDoc(reviewdocref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      });
      swal({
        title: "Review sent",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      setInputrev("");
      setRating(0);
      setNewReview(newReview + 1);
    }
    else{
      swal({
        title: "To share your thoughts, please first do login.",
        icon: "error",
        buttons: false,
        timer: 3000
      })
      navigate('/login');
    } 
  }catch (err) {
      swal({
        title: err.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      setInputrev([]);
      try {
        let quer = query(reviewRef, where("movie_id", "==", id));
        const querySnapShot = await getDocs(quer);
        querySnapShot.forEach((doc) => {
          setReviewData((prev) => [...prev, doc.data()]);
        });
      } catch (err) {
        swal({
          title: err.message,
          icon: "error",
          buttons: false,
          timer: 3000,
        });
      }
      setReviewLoading(false);
    }
    getData();
  }, [newReview, id]);

  return (
    <div className="mt-4 border-t-2 border-gray-700 ">
      <ReactStars
        className="mt-1"
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        value={inputrev}
        onChange={(e) => setInputrev(e.target.value)}
        className="w-full outline-none header text-white h-10 px-2"
        placeholder="Share your thoughts here...."
      />
      <button
        onClick={sendReview}
        className="bg-green-800 hover:bg-green-600 w-full p-2 mt-2 flex justify-center"
      >
        {loading ? <TailSpin height={20} color="white" /> : "Share"}
      </button>

      {reveiwLoading ? (
        <div className="mt-6 flex justify-center">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div>
          {reviewData?.map((e, i) => {
            return (
              <div key={i} className="bg-zinc-900 p-2 w-full mt-4">
                <div className="flex items-center">
                  <p className="text-orange-700 mr-4"><b>{e.name}</b></p>
                  <p className="text-sm">({new Date(e.timestamp).toLocaleString()})</p>
                </div>
                <ReactStars
                  className="mt-1"
                  size={15}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
