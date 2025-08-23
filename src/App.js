import logo from './img/logo.svg'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPg from './components/login/login';
import MainPg from './components/mainpg/mainPg';
import SignUpPg1 from './components/signUp/signup1';
import SignUpPg2 from './components/signUp/signup2';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPg />} />

      <Route path="/main" element={<MainPg />} />

      <Route path="/signup" element={<SignUpPg1 />} />
      <Route path="/signup/step2" element={<SignUpPg2 />} />
      {/* <Route path="/singpu/step3" element={<SignUpPg3 />} /> */}
      <Route path="/main" element={<MainPg />} />
      <Route path="/main" element={<MainPg />} />
      <Route path="/main" element={<MainPg />} />
      <Route path="/main" element={<MainPg />} />
      <Route path="/main" element={<MainPg />} />



    </Routes>
  );
}


export default App;
