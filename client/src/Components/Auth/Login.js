import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { signin } from "../../redux/actions/UserAction";
import { isEmptyObject } from './SignUp';
import { useDispatch, useSelector } from "react-redux";
import { omit } from 'lodash';
import * as api from '../../redux/api';

import "./style.css";

const initialState = {
    email: "",
    password: "",
};

const Login = () => {
    const [user, setUser] = useState(initialState);
    const [showPassword,setshowPassword] = useState(false)
    const [errors, setErrors] = useState({});
    const [errmsg, setErrMes] = useState({});
    const {authData} = useSelector((state) => state.UserReducer);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formErrors = new FormData();
    const location = useLocation();
    
    localStorage.setItem('Login', JSON.stringify(authData));
    const handleChange = (e, text) => {
        setUser({ ...user, [e.target.name]: e.target.value });

        switch (text) {
            case "email":
                // if (
                //     !new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(user.email)
                // ) {
                //     setErrors({
                //         ...errors,
                //         email: 'Enter a valid email address'
                //     })
                // }
                // else {
                //     let newObj = omit(errors, "email");
                //     setErrors(newObj);

                // }
                break;
            case "password":


                break;
            default:
                break;

        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMes(null)
        if (!(user?.email)) {
            formErrors["email"] = "Email is Required"
        }
        if (!user?.password) {
            formErrors["password"] = "Password is Required"
        }
        setErrors(formErrors)
        if (isEmptyObject(formErrors)) {
            try {
                dispatch(signin(user, navigate));
                const response = await api.signIn(user);
                if (response) {
                    console.log(location)
                    setTimeout(() => {
                        if (location?.state?.pathaname == "member") {
                            navigate('/member', { state: { zipCode:location?.state.zipCode  } })
                        }else if(location?.state?.pathaname == "myprofile"){
                            navigate('/myprofile')
                        }else {
                            navigate('/')
                        }
                    }, 1000);
                    setErrMes({
                        success: 'You have Login Successfully'
                    })
                }

            }
            catch {
                setErrMes({
                    ...errmsg,
                    invalid: 'Invalid Email or Password'
                })
            }
        }
    };
    const handlepassword = () =>{
        setshowPassword(!showPassword)
    }


    return (
        <div id="login-form" className="container">
            <form className="form-container" onSubmit={handleSubmit}>
                <div>
                    <Link to="/"><img src={"./images/logo.png"} className="logo" alt="BigCo Inc. logo" /></Link>
                    <div>
                        <h4 className="social-media-title">Sign In</h4>
                        <div>
                            <label>Email</label><br />
                            <input className="form-input"
                                type="email"
                                name="email"
                                onChange={(e) => handleChange(e, "email")} />
                            {errors?.email && <span className="error-message">{errors?.email}<br /></span>}
                            <label >Password</label><br />
                            <div className="form-input d-flex">
                                <input style={{ "border": "none", "width": "inherit" }}
                                    type={showPassword? "text": "password"}
                                    name="password"
                                    onChange={(e) => handleChange(e, "password")} />
                                <Link onClick={handlepassword}>
                                {showPassword? 
                                    <img src='./images/eye.png' width={"23px"} style={{"marginRight":"10px"}} />
                                    :
                                    <img src='./images/hidden.png' width={"23px"} style={{"marginRight":"10px"}} />
                                }
                                </Link>
                            </div>
                            {errors?.password && <span className="error-message">{errors?.password}<br /></span>}
                            {errmsg?.invalid && <span className="error-message">{errmsg?.invalid}<br /></span>}
                            {errmsg?.success && <span className="sucess-message" >{errmsg?.success}<br /></span>}
                            <button className="submit-button" type="submit" >Submit</button>
                            <div className="form-footer">
                                <strong>
                                    <a href="/register">New user? Create an account</a> <br />
                                </strong>
                                <a href="/"><strong>Cancel </strong></a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default Login
