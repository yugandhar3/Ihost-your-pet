import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { isEmptyObject } from '../Auth/SignUp';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import * as api from '../../redux/api/index.js';
import {
    MDBIcon,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBCheckbox } from 'mdb-react-ui-kit';

function PersonalInfo() {
    // const { authData } = useSelector((state) => state.UserReducer)
    let authData = JSON.parse(localStorage.getItem('Login'))
    const formErrors = new FormData();
    const [errors, setErrors] = useState();
    const [showPassword, setshowPassword] = useState(false)
    const [messages, setMessages] = useState()
    const [pass, setPass] = useState()
    const [profileData, setProfileData] = useState({
        firstName: authData?.firstName,
        lastName: authData?.lastName,
        streetAddress: authData?.streetAddress,
        city: authData?.city,
        state: authData?.state,
        zipCode: authData?.zipCode,
        phoneNo: authData?.phoneNo,
        email: authData?.email,
        petType: authData?.petType,
        noOfPetToHost: authData?.noOfPetToHost,
        PetAcceptingTime: authData?.PetAcceptingTime
    })
    const initialNewPassword ={
        password:""
    }
    useEffect(() => {
        const getMember = async () => {
            await api.getMyBucksDetail(authData?.id).then((res) => {
                let apiPassword = res.data.map((p) => p.password)
                setPass(apiPassword)
            })
        }
        getMember()
    }, [])

    const [updatePassword, setUpdatePassword] = useState(initialNewPassword)
    console.log(updatePassword)
    const [iconsActive, setIconsActive] = useState('tab1');
    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    }
    const handleChangePassword = (e) => {
        setUpdatePassword({ [e.target.name]: e.target.value });
    }
    const validate = () => {
        if (!(profileData?.firstName)) {
            formErrors["firstName"] = "First name is required"
        }
        if (!(profileData?.lastName)) {
            formErrors["lastName"] = "Last name is required"
        }
        if (!(profileData?.streetAddress)) {
            formErrors["streetAddress"] = "Street address is required"
        }
        if (!(profileData?.city)) {
            formErrors["city"] = "City is required"
        }
        if (!(profileData?.state)) {
            formErrors["state"] = "State is required"
        }
        if (!new RegExp("^[a-zA-Z \s]+$").test(profileData?.firstName)) {
            formErrors["firstName"] = "First name contains only letters"
        }
        if (!new RegExp("^[a-zA-Z \s]+$").test(profileData?.lastName)) {
            formErrors["lastName"] = "Last name contains only letters"
        }
        if (!new RegExp("^[a-zA-Z \s]+$").test(profileData?.city)) {
            formErrors["city"] = "City contains only letters"
        }
        if (!new RegExp("^[a-zA-Z \s]+$").test(profileData?.state)) {
            formErrors["state"] = "State contains only letters"
        }
        if (!new RegExp("^[0-9]*$").test(profileData?.zipCode)) {
            formErrors["zipCode"] = "Enter a valid zipcode"
        }else if(!(profileData?.zipCode.length == 5)){
            formErrors["zipCode"] = "Enter a valid zipcode"
          }
        if (!new RegExp("^[0-9]*$").test(profileData?.phoneNo)) {
            formErrors["phoneNo"] = "Enter a valid phone number"
        }else if(!(profileData?.phoneNo.length == 10)){
            formErrors["phoneNo"] = "Enter a valid phone number"
          }
        if (!(profileData?.noOfPetToHost)) {
            formErrors["noOfPetToHost"] = "NoOfPetToHost is required"
        }
        if (!(profileData?.petType)) {
            formErrors["petType"] = "pet type is required"
        }
        if (!(profileData?.PetAcceptingTime)) {
            formErrors["PetAcceptingTime"] = "Pet accepting time is required"
        }
        if (
            !new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(profileData?.email)
        ) {
            formErrors["email"] = "Enter a valid email address"
        }

        setErrors(formErrors)
    }
    const passwordValidate = () => {
        console.log(updatePassword)
        if(!(updatePassword?.password)){
            formErrors["password"] = "New password is required "
        }else if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(updatePassword?.password)) {
            formErrors["password"] = "Password should contain 8 characters with lowercase, uppercase & numbers"
        }else if ( pass == updatePassword?.password) {
            formErrors["password"] = "Old password and new password should not be the same"
        }
        setErrors(formErrors)
    }
    const updateProfile = async () => {
        validate()
        if (isEmptyObject(formErrors)) {
            await api.profileUpdate(authData?.id, profileData).then((res) => {
                if (res.status) {
                    setProfileData(res.data)
                    showToastMessageUpdateProfile()

                }
            })
        }else{
            goToTop()
        }
    }
    const getMember = async () => {
        await api.getMyBucksDetail(authData?.id).then((res) => {
            let apiPassword = res.data.map((p) => p.password)
            setPass(apiPassword)
        })
    }
    const passwordChange = async () => {
        passwordValidate()
        if (isEmptyObject(formErrors)) {
            await api.passwordUpdate(authData?.id, updatePassword).then((res) => {
                if (res.status) {
                    getMember()
                    showToastMessageUpdatePassword()
                    setUpdatePassword(initialNewPassword)
                }
            })
        }
        
    }
 

    const handlepassword = () => {
        setshowPassword(!showPassword)
    }

    const showToastMessageUpdateProfile = () => {
        toast.success('successfully updated your profile', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const showToastMessageUpdatePassword = () => {
        toast.success('successfully updated your password', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const handleIconsClick = (value) => {
        if (value === iconsActive) {
            return;
        }

        setIconsActive(value);
    };
    const goToTop =()=>{
        window.scrollTo(0,0)};
    return (
        <div>
            <MDBTabs className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink className="tab-heading" style={{ "fontWeight": "700" }} onClick={() => handleIconsClick('tab1')} active={iconsActive === 'tab1'}>
                        <MDBIcon fas icon='chart-pie' className='me-2' />My Details
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink className="tab-heading" style={{ "fontWeight": "700" }} onClick={() => handleIconsClick('tab2')} active={iconsActive === 'tab2'}>
                        <MDBIcon fas icon='chart-line' className='me-2' /> Change Password
                    </MDBTabsLink>
                </MDBTabsItem>

            </MDBTabs>
            <MDBTabsContent>
                <MDBTabsPane show={iconsActive === 'tab1'}>
                    <Row>
                        {/* <Col md={6} lg={4}> */}
                        <div>
                            <ul className='personalInfo_ul'>
                                <li className='personalInfo_li'>
                                    <label className='label-font-weight'>First Name</label><br />
                                    <input className="form-input-pr"
                                        type="Text"
                                        name="firstName"
                                        value={profileData?.firstName}
                                        maxLength={30}
                                        onChange={handleChange} /><br />
                                    {errors?.firstName && <span className="error-message">{errors?.firstName}<br /></span>}

                                </li>
                                <li>
                                    <label className='label-font-weight'>Last Name</label><br />
                                    <input className="form-input "
                                        type="Text"
                                        name="lastName"
                                        value={profileData?.lastName}
                                        maxLength={30}
                                        onChange={handleChange} /><br />
                                    {errors?.lastName && <span className="error-message">{errors?.lastName}<br /></span>}
                                </li>
                            </ul>
                            <ul className='personalInfo_ul'>
                                <li className='personalInfo_li'>
                                    <label className='label-font-weight'>Street Address</label><br />
                                    <input className="form-input"
                                        type="Text"
                                        name="streetAddress"
                                        value={profileData?.streetAddress}
                                        maxLength={30}
                                        onChange={handleChange} /><br />
                                    {errors?.streetAddress && <span className="error-message">{errors?.streetAddress}<br /></span>}
                                </li>
                                <li>
                                    <label className='label-font-weight'>State</label><br />
                                    <input className="form-input"
                                        type="Text"
                                        name="state"
                                        value={profileData?.state}
                                        maxLength={30}
                                        onChange={handleChange} /><br />
                                    {errors?.state && <span className="error-message">{errors?.state}<br /></span>}
                                </li>
                            </ul>
                            <ul className='personalInfo_ul'>
                                <li className='personalInfo_li'>
                                    <label className='label-font-weight'>City</label><br />
                                    <input className="form-input"
                                        type="Text"
                                        name="city"
                                        value={profileData?.city}
                                        maxLength={30}
                                        onChange={handleChange} /><br />
                                    {errors?.city && <span className="error-message">{errors?.city}<br /></span>}
                                </li>
                                <li>
                                    <label className='label-font-weight'>Phone Number</label><br />
                                    <input className="form-input"
                                        type="phone"
                                        name="phoneNo"
                                        maxLength={10}
                                        value={profileData?.phoneNo}
                                        onChange={handleChange} /><br />
                                    {errors?.phoneNo && <span className="error-message">{errors?.phoneNo}<br /></span>}
                                </li>
                            </ul>
                            <ul className='personalInfo_ul'>
                                <li className='personalInfo_li'>
                                    <label className='label-font-weight'>Zip Code</label><br />
                                    <input className="form-input"
                                        type="text"
                                        name="zipCode"
                                        maxLength={5}
                                        value={profileData?.zipCode}
                                        onChange={handleChange} /><br />
                                    {errors?.zipCode && <span className="error-message">{errors?.zipCode}<br /></span>}
                                </li>
                                <li>
                                    <label className='label-font-weight'>Email</label><br />
                                    <input className="form-input"
                                        type="email"
                                        name="email"
                                        value={profileData?.email}
                                        maxLength={50}
                                        onChange={handleChange} /><br />
                                    {errors?.email && <span className="error-message">{errors?.email}<br /></span>}
                                </li>
                            </ul>
                            <ul className='personalInfo_ul'>
                                <li className='personalInfo_selecter'>
                                    <label className='label-font-weight'>Pet Accepting Time </label>
                                    <Form.Select className="dropdown-pr" aria-label="Default select example" defaultValue={profileData?.PetAcceptingTime} name="PetAcceptingTime" style={{ "padding": "10px", "border": "1px solid #333333a6" }} onChange={handleChange}>
                                        <option value="Anytime">Anytime</option>
                                        <option value="Morning">Morning</option>
                                        <option value="Afternoon">Afternoon</option>
                                        <option value="Evening">Evening</option>

                                    </Form.Select>
                                    {errors?.PetAcceptingTime && <span className="error-message">{errors?.PetAcceptingTime}<br /></span>}

                                </li>
                                <li>
                                    <label className='label-font-weight'>Pet Type </label>
                                    <Form.Select className="dropdown-pettype" aria-label="Default select example" defaultValue={profileData?.petType} name="petType" style={{ "padding": "10px", "border": "1px solid #333333a6" }} onChange={handleChange}>
                                        <option value="Dog">Dog</option>
                                        <option value="Cat">Cat</option>

                                    </Form.Select>

                                    {errors?.petType && <span className="error-message">{errors?.petType}<br /></span>}
                                </li>
                            </ul>
                            <ul className='personalInfo_ul'>
                                <li className='personalInfo_li'>
                                    <label className='label-font-weight' >No of pets to host </label>
                                    <Form.Select className="dropdown-noofpet" aria-label="Default select example" name="noOfPetToHost" defaultValue={profileData?.noOfPetToHost} style={{ "padding": "10px", "border": "1px solid #333333a6"}} onChange={handleChange}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Form.Select>
                                    {errors?.noOfPetToHost && <span className="error-message">{errors?.noOfPetToHost}<br /></span>}
                                </li>
                                <li></li>
                            </ul>
                            <ul className='personalInfo_ul'>
                                <li> <button className="submit-button-pr" type="submit" onClick={updateProfile} >Save Changes</button></li>
                                <li></li>
                            </ul>





                        </div>
                        {/* </Col>
                        <Col md={6} lg={4}> */}
                        <div>





                        </div>
                       
                      
                    </Row>
                </MDBTabsPane>
                <MDBTabsPane show={iconsActive === 'tab2'}>
                    <Row>
                    <ul className='personalInfo_ul'>
                                <li className='personalInfo_li'> 
                                <label className='label-font-weight'>Old Password</label><br />
                            <div className="form-input d-flex">
                                <input style={{ "border": "none", "width": "inherit" }}
                                    type={showPassword ? "text" : "password"}
                                    value={pass}
                                    name="password"
                                    // onChange={handleChangePassword}
                                    readOnly />
                                <Link onClick={handlepassword}>
                                    {showPassword ?
                                        <img src='./images/eye.png' width={"23px"} style={{ "marginRight": "10px" }} />
                                        :
                                        <img src='./images/hidden.png' width={"23px"} style={{ "marginRight": "10px" }} />
                                    }
                                </Link>
                            </div>
                            </li>
                            <li>
                            <label className='label-font-weight'>New Password</label><br />
                            <div className="form-input d-flex">
                                <input style={{ "border": "none", "width": "inherit" }}
                                    type="text"
                                    name="password"
                                    value={updatePassword?.password}
                                    onChange={handleChangePassword} />
                            </div>
                            {errors?.password && <span className="error-message">{errors?.password}<br /></span>}
                            {<span className="sucess-message"> {messages}</span>}
                            </li>
                        </ul>
                        <ul className='personalInfo_ul'>
                                <li className='personalInfo_li'>
                                 <button className="submit-button" type="submit" onClick={passwordChange} >Save Changes</button></li>
                            <li></li>
                        </ul>
                        <Col md={6} lg={4}>
                           
                        </Col>
                        <Col md={6} lg={4}>
                           
                        </Col>
                        <Col lg={4}>
                        </Col>
                    </Row>
                    <Row>

                        <Col md={6} lg={4}>
                           
                        </Col>
                        <Col md={4}>

                        </Col>
                        <Col md={4}>

                        </Col>
                    </Row>
                </MDBTabsPane>
            </MDBTabsContent>
        </div >
    )
}

export default PersonalInfo