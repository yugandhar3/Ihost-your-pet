import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { SiCodeigniter } from 'react-icons/si'
import { signup } from "../../redux/actions/UserAction";
import { useDispatch } from "react-redux";
import * as api from '../../redux/api/index';
import validator from 'validator';
import Logo from "../../images/logo.svg"
import Form from 'react-bootstrap/Form';
import Footer from '../../Components/Navbar/Footer'
import Header from '../../Components/Navbar/Header'
import "./style.css";

const initialState = {
  firstName: "",
  lastName: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  phoneNo: "",
  email: "",
  password: ""
};

const PetRegister = () => {
  const [isemailexists, setIsEmailexists] = useState(true)
  const [user, setUser] = useState();
  const [formErrors, setFormErrors] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleContinue = async () => {
  //   try {
  //     await api.emailvalidate(user);
  //     setIsEmailexists(false);
  //     setFormErrors("")
  //   } catch (error) {
  //     setIsEmailexists(true);
  //     setFormErrors("Email Address Already Exist");
  //   }
  //   var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //   if (user.email.match(validRegex)) {

  //   } else {
  //     setIsEmailexists(true);
  //     setFormErrors("Invalid email address!");
  //   }

  // }

  const handleChange = (e) => {
    setFormErrors("")
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const validate = (value) => {

    // if (validator.isStrongPassword(value, {
    //   minLength: 8, minLowercase: 1,
    //   minUppercase: 1, minNumbers: 1, minSymbols: 1
    // })) {

    dispatch(signup(user, navigate));

    // } else {
    //   setFormErrors('Is Not Strong Password')
    // }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    validate(user.password)
  };
  return (
    <>
      <Header />
      <section className='pet-section'>
        <div className="container">
          <h1>My Pet details</h1>
          <div className="form-container">
            <>
              <div>
                <div>
                  <label>Pet Name</label><br />
                  <input className="form-input"
                    type="Text"
                    name="firstName"
                    onChange={handleChange} /><br />
                  <label>Pet Type</label><br />
                  <input className="form-input"
                    type="Text"
                    name="lastName"
                    onChange={handleChange} /><br />
                  <label>Breed</label><br />
                  <input className="form-input"
                    type="Text"
                    name="streetAddress"
                    onChange={handleChange} /><br />
                  <label className='mb-2'>Size</label><br />
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Small
                  </label>
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Medium
                  </label>
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Large
                  </label><br />
                  <label className='mt-3 mb-2'>Gender</label><br />
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Male
                  </label>
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Female
                  </label><br />
                  <label className='mt-3'>Age</label><br />
                  <input className="form-input"
                    type="number"
                    name="zipCode"
                    onChange={handleChange} /><br />
                  <div class="form-check form-switch mt-2">
                    <label class="mb-4" for="flexSwitchCheckDefault">Vaccination Current?</label>
                    <input class="form-check-input mb-3" type="checkbox" id="flexSwitchCheckDefault" />
                  </div>

                  <button className="submit-button" style={{ "backgroundColor": "#EE8A38" ,    "marginTop": "10px" }} type="submit" onClick={handleSubmit}>Submit</button>
                  <div className="form-footer">

                  </div>
                </div>
              </div>
            </>
          </div>
          <div className="privacy-policy">
            {/* <p>By registering, you agree to our <strong>Terms of Service</strong> and <strong> Privacy Policy.</strong></p> */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
export default PetRegister