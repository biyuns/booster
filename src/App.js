import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPg from './components/login/login';
import MainPg from './components/mainpg/mainPg';
import SignUpPg1 from '../src/components/signUp/signup1';
import SignUpPg2 from './components/signUp/signup2';
import SignUpPg from './components/signUp/signUp';
import SignUpServ from './components/signUp/signUp_serv';
import SignUpCommu from './components/signUp/signUp_commu';
import SignUpPI from './components/signUp/signUp_PI';
import SignUpPg3 from './components/signUp/signup3';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPg />} />

      <Route path="/main" element={<MainPg />} />

      <Route path="/signup/step1" element={<SignUpPg1 />} />
      <Route path="/signup/step2" element={<SignUpPg2 />} />
      <Route path="/signup" element={<SignUpPg />} />
      <Route path="/signup/step3" element={<SignUpPg3 />} /> 
      <Route path="/signup/service" element={<SignUpServ />} />
      <Route path="/signup/community" element={<SignUpCommu />} />
      <Route path="/signup/pi" element={<SignUpPI />} />
      {/* <Route path="/main" element={<MainPg />} /> */}



    </Routes>
  );
}


export default App;
