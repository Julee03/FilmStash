import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";

const Header = () => {
  const useAppstate = useContext(Appstate);

  return (
    <div
      className="sticky z-10 top-0 header text-3xl text-red-600 font-bold p-4 flex 
    justify-between items-center border-b-2 border-gray-600"
    >
      <Link to="/">
        {" "}
        <span>
          Film<span className="text-white">Stash</span>
        </span>
      </Link>
      <div className="text-lg text-slate-200 flex items-center cursor-pointer">
        {useAppstate.login ?
          <Link to="/addnew">
          <Button>
            <AddIcon color="success" />
            <span className="text-white">Add new</span>
          </Button>
        </Link> :
        <Link to="/login">
        <Button variant="contained" color="success">
          Login
        </Button>
      </Link>
}
      </div>
    </div>
  );
};

export default Header;
