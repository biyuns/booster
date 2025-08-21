import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPg from './components/login/login';
import SignUpPI from './components/signUp/signUp_PI';
import MainPg from './components/mainpg/mainPg';
import MyPg from './components/mypage/myPg';
import MyPgedit from './components/mypage/myPg_edit';
import MyPgpsw from './components/mypage/myPg_psw';
import BoonFood from './components/boon/boon_food';
import Booncafe from './components/boon/boon_cafe';
import Boonfitness from './components/boon/boon_fitness';
import Boonmolan from './components/boon/boon_molan';
import Boonetc from './components/boon/boon_etc';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Boonetc />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
