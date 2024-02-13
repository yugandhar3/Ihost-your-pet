import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { signup } from "../../redux/actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import * as api from '../../redux/api/index';
import Logo from "../../images/logo.svg"
import { signin } from "../../redux/actions/UserAction";
import { omit } from 'lodash';

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

const SignUp = () => {
  const [isemailexists, setIsEmailexists] = useState(true)
  const [user, setUser] = useState({
    petType: "Dog",
    noOfPetToHost: "1",
    PetAcceptingTime: "Anytime"
  });
  const [errors, setErrors] = useState();
  const [errmsg, setErrMes] = useState({});
  const [terms, setTerm] = useState(false)
  const [proof, setProof] = useState(false)
  const [valide, setValide] = useState(true)
  const [showPassword, setshowPassword] = useState(false)
  const [showConfromPassword, setShowConfromPassword] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formErrors = new FormData();
  const { authData } = useSelector((state) => state);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const goToTop = () => {
    window.scrollTo(0, 0)
  };
  const handleTerm = (e) => {
    setTerm(!terms)
  }
  const handleProof = (e) => {
    setProof(!proof)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    goToTop()
    setErrMes(null)
    if (!(user?.firstName)) {
      formErrors["firstName"] = "First name is required"
    }
    if (!(user?.lastName)) {
      formErrors["lastName"] = "Last name is required"
    }
    if (!(user?.streetAddress)) {
      formErrors["streetAddress"] = "Street address is required"
    }
    if (!(user?.city)) {
      formErrors["city"] = "City is required"
    }
    if (!(user?.state)) {
      formErrors["state"] = "State is required"
    }
    if (!(user?.noOfPetToHost)) {
      formErrors["noOfPetToHost"] = "NoOfPetToHost is required"
    }
    if (!(user?.petType)) {
      formErrors["petType"] = "Pet type is required"
    }
    if (!(user?.PetAcceptingTime)) {
      formErrors["PetAcceptingTime"] = "Pet accepting time is required"
    }
    if (!new RegExp("^[a-zA-Z \s]+$").test(user?.firstName)) {
      formErrors["firstName"] = "First name contain only letters"
    }
    if (!new RegExp("^[a-zA-Z \s]+$").test(user?.lastName)) {
      formErrors["lastName"] = "Last name contain only letters"
    }
    if (!new RegExp("^[0-9]*$").test(user?.zipCode)) {
      formErrors["zipCode"] = "Enter a valid zipcode"
    } else if (!(user?.zipCode.length == 5)) {
      formErrors["zipCode"] = "Enter a valid zipcode"
    }
    if (!new RegExp("^[0-9]*$").test(user?.phoneNo)) {
      formErrors["phoneNo"] = "Enter a valid phone number"
    } else if (!(user?.phoneNo.length == 10)) {
      formErrors["phoneNo"] = "Enter a valid phone Number"
    }
    // if (!new RegExp("/\s/g").test(user?.phoneNo)) {
    //   formErrors["phoneNo"] = "Enter a valid phone Number"
    // }
    // if (!new RegExp("^([a-zA-Z0-9 \s])+[a-zA-Z0-9]+$").test(user?.streetAddress)) {
    //   formErrors["streetAddress"] = "street Address contains only letters"
    // }
    if (!new RegExp("^[a-zA-Z \s]+$").test(user?.city)) {
      formErrors["city"] = "City contains only letters"
    }
    if (!new RegExp("^[a-zA-Z \s]+$").test(user?.state)) {
      formErrors["state"] = "State contains only letters"
    }
    if (
      !new RegExp(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(user?.email)
    ) {
      formErrors["email"] = "Enter a valid email address"
    }
    if (
      !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(user?.password)
    ) {
      formErrors["password"] = "Password should contain atleast 8 charaters with uppercase, lowercase and numbers"
    }
    if (!terms) {
      formErrors["term"] = "Please agree to our Terms of Service & Privacy Policy."
    }
    if (!proof) {
      formErrors["proof"] = "Please agree to the proof of concept."
    }
    if (!(user?.password == user?.confirmpassword)) {
      formErrors["confirmpassword"] = "Password and confirm password is not matching"
    }
    setErrors(formErrors)
    let streetAddress = user.streetAddress.replace(/\s+/g, ',');
    if (isEmptyObject(formErrors)) {
      try {
        const response = await api.signUp({
          "firstName": user.firstName,
          "lastName": user.lastName,
          "streetAddress": streetAddress,
          "city": user.city,
          "state": user.state,
          "zipCode": user.zipCode,
          "phoneNo": user.phoneNo,
          "email": user.email,
          "password": user.password,
          "petType": user.petType,
          "noOfPetToHost": user.noOfPetToHost,
          "PetAcceptingTime": user.PetAcceptingTime
        });

        localStorage.setItem('Login', JSON.stringify(response?.data));
        dispatch(signin({
          "email": user.email, "password": user.password
        }, navigate));

        if (response) {
          setTimeout(() => {
            navigate('/myprofile')
          }, 2000);
          setErrMes({
            success: 'You have registered Successfully'
          })
        }
      } catch (error) {
        if (error.response.status == "400") {
          setErrMes({
            email: 'Email Already Existed'
          })
        }
      }
    } else {
      setErrMes({
        success: "Please check for error fields"
      })
    }
  };
  const handlepassword = () => {
    setshowPassword(!showPassword)
  }
  const handleconformpassword = () => {
    setShowConfromPassword(!showConfromPassword)
  }
  return (
    <div className="container" id="signup-form">
      <div className="form-container">
        <div>
          <Link to="/"><img src={"./images/logo.png"} className="logo" alt="BigCo Inc. logo" /></Link>
          <div>
            <h5 className="social-media-title">Get Started With iHostYourPet</h5>
            <p style={{ "color": "red" }}>*All fields are mandatory</p>
            <>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>First Name</label>
                  <input className="form-input"
                    type="Text"
                    name="firstName"
                    maxLength={30}
                    onChange={handleChange} />
                  {errors?.firstName && <span className="error-message">{errors?.firstName}</span>}<br />
                  <label>Last Name</label>
                  <input className="form-input"
                    type="Text"
                    name="lastName"
                    maxLength={30}
                    onChange={handleChange} />
                  {errors?.lastName && <span className="error-message">{errors?.lastName}</span>}<br />
                  <label>Street Address</label>
                  <input className="form-input"
                    type="Text"
                    name="streetAddress"
                    maxLength={50}
                    onChange={handleChange} />
                  {errors?.streetAddress && <span className="error-message">{errors?.streetAddress}</span>}<br />
                  <label>City</label><br />
                  <input className="form-input"
                    type="Text"
                    name="city"
                    maxLength={30}
                    onChange={handleChange} />
                  {errors?.city && <span className="error-message">{errors?.city}</span>}<br />
                  <label>State</label>
                  <input className="form-input"
                    type="Text"
                    name="state"
                    maxLength={30}
                    onChange={handleChange} />
                  {errors?.state && <span className="error-message">{errors?.state}</span>}<br />
                  <label>Zip Code</label>
                  <input className="form-input"
                    type="zipCode"
                    name="zipCode"
                    maxLength={5}
                    onChange={handleChange} />
                  {errors?.zipCode && <span className="error-message">{errors?.zipCode}</span>}<br />
                  <label>Phone Number</label>
                  <input className="form-input"
                    type="phone"
                    name="phoneNo"
                    maxLength={10}
                    onChange={handleChange} />
                  {errors?.phoneNo && <span className="error-message">{errors?.phoneNo}</span>}<br />
                  <label >Select Pet Accepting Time </label><br />
                  <Form.Select className="form-input" aria-label="Default select example" name="PetAcceptingTime" style={{ "padding": "10px", "border": "1px solid #333333a6" }} onChange={handleChange}>
                    <option value="Anytime">Anytime</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>

                  </Form.Select>
                  {errors?.PetAcceptingTime && <span className="error-message">{errors?.PetAcceptingTime}</span>}<br />
                  <label >Select Pets </label>
                  <Form.Select className="form-input" aria-label="Default select example" name="noOfPetToHost" style={{ "padding": "10px", "border": "1px solid #333333a6" }} onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                  {errors?.noOfPetToHost && <span className="error-message">{errors?.noOfPetToHost}</span>}<br />
                  <label>Select Pet Type </label>
                  <Form.Select className="form-input" aria-label="Default select example" name="petType" style={{ "padding": "10px", "border": "1px solid #333333a6" }} onChange={handleChange}>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>

                  </Form.Select>
                  {errors?.petType && <span className="error-message">{errors?.petType}</span>}<br />
                  <label>Email</label><br />
                  <input className="form-input"
                    type="email"
                    name="email"
                    maxLength={40}
                    onChange={handleChange} />
                  {errors?.email && <span className="error-message">{errors?.email}<br /></span>}
                  {errmsg?.email && <span className="error-message">{errmsg?.email}<br /></span>}
                  <label>Password</label><br />
                  {/* <input className="form-input"
                    type="password"
                    name="password"
                    onChange={handleChange} /> */}
                  <div className="form-input d-flex">
                    <input style={{ "border": "none", "width": "inherit" }}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange} />
                    <Link onClick={handlepassword}>
                      {showPassword ?
                        <img src='./images/eye.png' width={"23px"} style={{ "marginRight": "10px" }} />
                        :
                        <img src='./images/hidden.png' width={"23px"} style={{ "marginRight": "10px" }} />
                      }
                    </Link>
                  </div>
                  {errors?.password && <span className="error-message">{errors?.password}<br /></span>}
                  <label>Confirm Password</label>
                  <div className="form-input d-flex">
                    <input style={{ "border": "none", "width": "inherit" }}
                      type={showConfromPassword ? "text" : "password"}
                      name="confirmpassword"
                      onChange={handleChange} />
                    <Link onClick={handleconformpassword}>
                      {showConfromPassword ?
                        <img src='./images/eye.png' width={"23px"} style={{ "marginRight": "10px" }} />
                        :
                        <img src='./images/hidden.png' width={"23px"} style={{ "marginRight": "10px" }} />
                      }
                    </Link>
                  </div>
                  {errors?.confirmpassword && <span className="error-message">{errors?.confirmpassword}</span>}
                  <label className='terms'>
                    <input
                      className='form-check-input'
                      style={{ "margin-right": "13px", "verticalAlign": "-2px" }}
                      type="checkbox"
                      name="term"
                      onChange={handleTerm} />

                    By registering, you agree to our <strong>
                      <Link to="/termsofservice" onClick={() => goToTop()}>Terms of Service & Privacy Policy</Link></strong>.</label>
                  {errors?.term && <span className="error-message">{errors?.term}<br /></span>}
                  <label className='terms' >
                    <input
                      className='form-check-input'
                      style={{ "margin-right": "13px", "verticalAlign": "-2px" }}
                      type="checkbox"
                      name="proof"
                      onChange={handleProof}
                    />
                    I understand this service is still a proof of concept and does not cover insurance and other legalities.
                    <strong> <Link to="/disclaimer" onClick={() => goToTop()}>Click here</Link></strong> for more details.</label>
                </div>
                {errors?.proof && <span className="error-message">{errors?.proof}</span>}
                {errmsg?.success && <span className="sucess-message" style={{ "color": "green !important" }}>{errmsg?.success}</span>}
                <button className="submit-button" type="submit" onClick={handleSubmit}>Sign Up</button>
                <div className="form-footer">
                  <p>Already a iHostYourPet user? <a href="/login"><strong>Sign In</strong></a></p>
                  <Link to="/" onClick={() => goToTop()}><strong>Cancel </strong></Link>
                </div>
              </form>
            </>
          </div>
        </div>
        <div className="privacy-policy">
          {/* <p>By registering, you agree to our <strong>Terms of Service</strong> and <strong> Privacy Policy.</strong></p> */}
        </div>
      </div>
    </div>
  )
}
export default SignUp

export function isEmptyObject(obj) {
  if (typeof obj === 'object' && obj != null && Object.keys(obj).length !== 0) {
    return false;
  } else {
    return true;
  }
}