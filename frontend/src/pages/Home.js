import React, { useState } from "react";
import { useSelector } from "react-redux";
import Payments from "../components/pay/Payments";

const Home = () => {
  const { auth } = useSelector((state) => state.user);
  const [dep, setDep] = useState('')

  if (!auth) {
    return (
      <div className="pt-20">
        <div className="w-1/4 mx-auto">
          Login to Continue
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="w-1/3 mx-auto bg-slate-100 p-5 rounded-xl">
        <div className="mb-4">Deposit Fiat into your account</div>
        <input type={'number'} onChange={(e) => setDep(e.target.value)} value={dep} className={'w-full mb-2 rounded p-2 outline-1'} />
        <Payments depositAmount={dep} />
      </div>
    </div>
  );
};

export default Home;
