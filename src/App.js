import logo from './img/logo.svg'
import './App.css';


function App() {
  return (
    <div className="main-ct">
      <div className="logo-ct">
        <img src={logo} className="logo-img"></img>
      </div>
      {/* 폰트 적용 부분 수정: fontfamily -> fontFamily */}
      <p className="logo-text" style={{ fontFamily: 'GmarketSans', fontWeight:'400'}}> Booster </p>
    </div>
  );
}


export default App;
