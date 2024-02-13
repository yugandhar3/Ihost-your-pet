import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MyCalendar from "../src/Components/Calender/calenderwidget";
import "./App.css";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Member from "./Pages/Member";
import PetRegister from "./Components/Auth/PetRegister";
import Aboutus from "./Pages/Aboutus";
import Termsofservice from "./Pages/Termsofservice";
import Disclaimer from "./Pages/Disclaimer";
import Findahost from "./Pages/Findahost";
import Myprofile from "./Pages/Myprofile";



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/aboutus" element={<Aboutus />} />
        {/* <Route exact path="/findahost" element={<Findahost />} /> */}
        <Route exact path="/termsofservice" element={<Termsofservice />} />
        <Route exact path="/disclaimer" element={<Disclaimer />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/member" element={<Member />} />
        <Route exact path="/pet" element={<PetRegister />} />
        <Route exact path="/myprofile" element={<Myprofile/>} />
        {/* <Route exact path="/request" element={<Request/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
