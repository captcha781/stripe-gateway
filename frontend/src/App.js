import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/Signup";
import Success from "./pages/Success";
import Fail from "./pages/Fail";
import { useEffect } from "react";
import authHeader from "./lib/authHeader";
import { infoLoader } from "./api/main";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/nav/Navigation";
import 'react-toastify/dist/ReactToastify.min.css'

function App() {
  const { auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    authHeader();
  }, [auth]);

  useEffect(() => {
    console.log('run');
    infoLoader(dispatch);
  }, [dispatch]);

  return (
    <div>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
