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
import Splash from './components/login/Splash';
import MyPg from './components/mypage/myPg';
import MyPgedit from './components/mypage/myPg_edit';
import MyPgpsw from './components/mypage/myPg_psw';
import MyPgUser from './components/mypage/myPgUser';
import Nball from './components/notice-board/nb-all';
import Ninf from './components/notice-board/nb-inf';
import Npromotion from './components/notice-board/nb.promotion';
import Nfree from './components/notice-board/nb-free';
import Ntmi from './components/notice-board/nb.tmi';
import Nbwrite from './components/notice-board/nb-write';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<LoginPg />} />

      <Route path="/main" element={<MainPg />} />

      <Route path="/signup/step1" element={<SignUpPg1 />} />
      <Route path="/signup/step2" element={<SignUpPg2 />} />
      <Route path="/signup" element={<SignUpPg />} />
      <Route path="/signup/step3" element={<SignUpPg3 />} /> 
      <Route path="/signup/service" element={<SignUpServ />} />
      <Route path="/signup/community" element={<SignUpCommu />} />
      <Route path="/signup/pi" element={<SignUpPI />} />
      <Route path="/mypage" element={<MyPg />} />
      <Route path="/mypage/profileedit" element={<MyPgedit />} />
      <Route path="/mypage/password" element={<MyPgpsw />} />
      <Route path="/mypage/userinfo" element={<MyPgUser />} />
      <Route path="/board" element={<Nball />} />
      <Route path="/board/inf" element={<Ninf />} />
      <Route path="/board/promotion" element={<Npromotion />} />
      <Route path="/board/free" element={<Nfree />} />
      <Route path="/board/tmi" element={<Ntmi />} />
      <Route path="/board/write" element={<Nbwrite />} />



    </Routes>
  );
}


export default App;
