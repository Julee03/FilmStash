import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addmovie from "./components/Addmovie";
import Card from "./components/Card";
import Detail from './components/Detail';
import Signin from "./components/Signin";
import Login from "./components/Login";
import { createContext, useState } from "react";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <Appstate.Provider value={{login, setLogin, userName, setUserName}}>
    <div className="App relative">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/addnew" element={<Addmovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
