import React, { useState, useEffect } from 'react'
import "./Navbar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import * as api from '../../redux/api/index.js';
import { useNavigate } from 'react-router-dom';

function Header() {
  // const state = useSelector((state) => state)
  const { buckData } = useSelector((state) => state.BuckReducer)
  let authData = JSON.parse(localStorage.getItem('Login'))
  const [profileData, setProfileData] = useState()
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const goToTop = () => {
    window.scrollTo(0, 0)
  };
// remove the value after 24 hours
setTimeout(function() {
  logOut()
  localStorage.removeItem('Login');
}, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
// 60 * 1000// 1 mint 

  const logOut = () => {
    localStorage.removeItem("Login")
    navigate("/")
  }
  return (
    <Navbar className='fixed-top' bg="light" expand="lg"  >
      <Container>
        <Link to="/" onClick={() => goToTop()}><img id='imgHome' src='./images/logo.png' /></Link>
        <div className='mobile'>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {authData ?
                <>

                  <Link to="/myprofile" className={splitLocation[1] === "myprofile" ? "active" : ""} onClick={() => goToTop()}>My Profile
                    <Dropdown className='dropdown'>
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#" >Credits: <span className='badge'>{buckData?.buckTractorCount ? buckData?.buckTractorCount : authData?.buckTractorCount}</span></Dropdown.Item>
                        <Link to="/" onClick={() => logOut()}>Logout<span class="badge" ></span></Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Link>



                </>
                :
                null
              }

        </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className={splitLocation[1] === "" ? "active" : ""} to="/" onClick={() => goToTop()}>Home</Link>
              <Link className={splitLocation[1] === "aboutus" ? "active" : ""} to="/aboutus" onClick={() => goToTop()}>What is iHostYourPet</Link>
              {/* <Link className={splitLocation[1] === "findahost" ? "active" : ""} to="/findahost" onClick={()=>goToTop()}>Find a Host</Link> */}
              <Link to="/member" className={splitLocation[1] === "member" ? "active" : ""} onClick={() => goToTop()}>Members</Link>
              {authData ?
                <>

                  <Link to="/myprofile" className={splitLocation[1] === "myprofile" ? "active" : "myprofile"} onClick={() => goToTop()}>My Profile </Link>
                    <Dropdown className='dropdown'>
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#" >Credits: <span className='badge'>{buckData?.buckTractorCount ? buckData?.buckTractorCount : authData?.buckTractorCount}</span></Dropdown.Item>
                        <Link to="/" onClick={() => logOut()}>Logout<span class="badge" ></span></Link>
                      </Dropdown.Menu>
                    </Dropdown>
                 



                </>
                :
                <Nav.Link href="/login" className={splitLocation[1] === "login" ? "active" : ""} style={{ "paddingLeft": "29px" }} onClick={() => goToTop()}>Sign In</Nav.Link>
              }

            </Nav>
          </Navbar.Collapse>
        
      </Container>
    </Navbar>








  )
}

export default Header