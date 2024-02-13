import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';
import { isEmptyObject } from '../Auth/SignUp';
import {
    MDBIcon,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBCheckbox } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as api from '../../redux/api/index.js';

function PetInfo() {
    // const { authData } = useSelector((state) => state.UserReducer)
    let authData = JSON.parse(localStorage.getItem('Login'))
    const [selectedDeletePetlist, setSelectedDeletePetlist] = useState()
    const [getPetDetails, setGetPetDetails] = useState()
    const formErrors = new FormData();
    const [iconsActive, setIconsActive] = useState('tab1');
    const [errors, setErrors] = useState();
    const [deleteShow, setDeleteShow] = useState(false)
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState()
    const petInitialState={
        petType: "Dog",
        petName: "",
        breed: "",
        size: "Medium",
        gender: "Male",
        age: "",

    }
    const [petDetails, setPetDetails] = useState(petInitialState);
    const [vaccinationToggle, setVaccinationToggle]= useState(false)

    useEffect(() => {
        const getPetDetail = async () => {
            await api.getPetDetail({ "memberId": authData?.id }).then((res) => {
                let sorted = res.data.sort((a, b) => b?.id - a?.id);
                setGetPetDetails(sorted)
            })
        }
        getPetDetail()
    }, [])
    const handleChangePet = (e) => {
        if (e.target.name === "vaccination") {
            console.log(e.target.checked)
            setPetDetails({ ...petDetails, [e.target.name]: e.target.checked });
        }else{
            setPetDetails({ ...petDetails, [e.target.name]: e.target.value });
        }
        
    }
    const petValidation = () => {
        getPetDetail()
        const petName = getPetDetails.filter((pet) => pet.petName === petDetails?.petName)
        console.log("petname", petName)
        if (!(petDetails?.petName)) {
            formErrors["petName"] = "Pet name is required"
        }
        else if (!petName || petName.length !== 0) {
            formErrors["petName"] = "Pet already exist "
        }
        if (!new RegExp("^[a-zA-Z \s]+$").test(petDetails?.petName)) {
            formErrors["petName"] = "Pet name contains only letters"
        }
        if (!(petDetails?.petType)) {
            formErrors["AddpetType"] = "Pet type is required"
        }
        if (!(petDetails?.breed)) {
            formErrors["breed"] = "Breed is required"
        }
        if (!new RegExp("^[a-zA-Z \s]+$").test(petDetails?.breed)) {
            formErrors["breed"] = "Breed contains only letters"
        }
        if (!(petDetails?.size)) {
            formErrors["size"] = "Size is required"
        }
        if (!(petDetails?.gender)) {
            formErrors["gender"] = "Gender is required"
        }
        if (!(petDetails?.age)) {
            formErrors["age"] = "Age is required"
        }
        if (!new RegExp("^[0-9]+$").test(petDetails?.age)) {
            formErrors["age"] = "Age contains only numbers"
        }
        console.log(petDetails?.vaccination)
        if (!(petDetails?.vaccination)) {
            formErrors["vaccination"] = "Vaccination is required"
        }

        setErrors(formErrors)

    }
    const petEditValidation = () => {
        if (!(petDetails?.petName)) {
            formErrors["petName"] = "Pet name is required"
        }
        if (!new RegExp("^[a-zA-Z \s]+$").test(petDetails?.petName)) {
            formErrors["petName"] = "Pet name contains only letters"
        }
        // if (!(petDetails?.petType)) {
        //     formErrors["AddpetType"] = "Pet type is required"
        // }
        if (!(petDetails?.breed)) {
            formErrors["breed"] = "Breed is required"
        }
        if (!new RegExp("^[a-zA-Z \s]+$").test(petDetails?.breed)) {
            formErrors["breed"] = "Breed contains only letters"
        }

        if (!(petDetails?.age)) {
            formErrors["age"] = "Age is required"
        }
        if (!new RegExp("^[0-9]+$").test(petDetails?.age)) {
            formErrors["age"] = "Age contains only numbers"
        }
        if (!(petDetails?.vaccination)) {
            formErrors["vaccination"] = "Vaccination is required"
        }

        setErrors(formErrors)

    }
    const getPetDetail = async () => {
        await api.getPetDetail({ "memberId": authData?.id }).then((res) => {
            let sorted = res.data.sort((a, b) => b?.id - a?.id);
            setGetPetDetails(sorted)
        })
    }
    const submitPetDetails = async (e) => {
        e.preventDefault();
        petValidation()
        if(petDetails.vaccination){
            petDetails.vaccination = "Yes"
        }

        if (isEmptyObject(formErrors)) {
            await api.addPetDetail({
                "petType": petDetails.petType,
                "petName": petDetails.petName,
                "breed": petDetails.breed,
                "size": petDetails.size,
                "gender": petDetails.gender,
                "age": petDetails.age,
                "vacination": petDetails.vaccination,
                "memberId": authData?.id
            }).then((res) => {
                if (res.status) {
                    setPetDetails(petInitialState)
                    getPetDetail()
                    showToastMessageAddPetDetails()
                    
                }
            })
        }
    }
    const editPetHandler = (pet) => {
        setPetDetails(pet)
        setShow(true)
    }
    const showToastMessageEditPet = () => {
        toast.success('successfully edited your pet details', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const editPet = async (id) => {
        petEditValidation()
        if(petDetails.vaccination){
            petDetails.vaccination = "Yes"
        }
        if (isEmptyObject(formErrors)) {
            await api.editPetDetail(id, {
                "petType": petDetails.petType,
                "petName": petDetails.petName,
                "breed": petDetails.breed,
                "size": petDetails.size,
                "gender": petDetails.gender,
                "age": petDetails.age,
                "vacination": petDetails.vaccination,
            })
                .then((res) => {
                    if (res.status) {
                        getPetDetail()
                        setShow(false)
                        showToastMessageEditPet()
                    }
                })
        }
    }
    const petDeleteHandler = (pet) => {
        setSelectedDeletePetlist(pet)
        setDeleteShow(true)
    }
    const deletePet = async (id) => {
        await api.deletePetDetail(id)
            .then((res) => {
                if (res.status) {
                    getPetDetail()
                    setDeleteShow(false)
                    showToastMessageDeleteEvent()
                }
            })
    }
    const handleChangeSize = (e, type) => {
        setPetDetails({ ...petDetails, [e.target.name]: type });
    }
    const showToastMessageAddPetDetails = () => {
        toast.success('successfully added your pet details', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const showToastMessageDeleteEvent = () => {
        toast.success('successfully deleted your pet details', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const handleClose = () => setShow(false);
    const handleDeleteClose = () => setDeleteShow(false)
    const handleIconsClick = (value) => {
        if (value === iconsActive) {
            return;
        }

        setIconsActive(value);
    };
    return (
        <div>

            <MDBTabs className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink className="tab-heading" style={{ "fontWeight": "700" }} onClick={() => handleIconsClick('tab1')} active={iconsActive === 'tab1'}>
                        <MDBIcon fas icon='chart-pie' className='me-2' /> Add Pet Details
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink className="tab-heading" style={{ "fontWeight": "700" }} onClick={() => handleIconsClick('tab2')} active={iconsActive === 'tab2'}>
                        <MDBIcon fas icon='chart-line' className='me-2' /> List Of Pet Details
                    </MDBTabsLink>
                </MDBTabsItem>

            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={iconsActive === 'tab1'}>
                    <Row>
                        {/* <Col md={6} lg={4}> */}
                        <div className="form-container">
                            <div>
                                <form onSubmit={submitPetDetails}>
                                    <ul className='personalInfo_ul'>
                                        <li className='personalInfo_li'>
                                            <label className='label-font-weight'>Pet Name</label><br />
                                            <input className="form-input"
                                                type="Text"
                                                name="petName"
                                                value={petDetails.petName}
                                                placeholder='Ex Tommy'
                                                maxLength={30}
                                                onChange={handleChangePet} /><br />
                                            {errors?.petName && <span className="error-message">{errors?.petName}<br /></span>}
                                        </li>
                                        <li>
                                            <label className='label-font-weight'>Age (in years)</label><br />
                                            <input className="form-input"
                                                type="text"
                                                name="age"
                                                value={petDetails.age}
                                                maxLength={3}
                                                placeholder='Ex 1'
                                                onChange={handleChangePet} /><br />
                                            {errors?.age && <span className="error-message">{errors?.age}<br /></span>}
                                        </li>
                                    </ul>
                                    <ul className='personalInfo_ul'>
                                        <li className='personalInfo_li_radio'>
                                            <label className=' mb-2 label-font-weight'>Gender</label><br />
                                            <input class="form-check-input" type="radio" name="gender" defaultChecked value="Male" id="flexRadioDefault1" onChange={(e) => handleChangeSize(e, "Male")} />
                                            <label class="form-check-label" style={{ "padding": "0px 30px 0px 5px" }} for="flexRadioDefault1">
                                                Male
                                            </label>
                                            <input class="form-check-input" type="radio" name="gender" value="Female" id="flexRadioDefault1" onChange={(e) => handleChangeSize(e, "Female")} />
                                            <label class="form-check-label" style={{ "padding": "0px 30px 0px 5px" }} for="flexRadioDefault1">
                                                Female
                                            </label><br />
                                            {errors?.gender && <span className="error-message">{errors?.gender}<br /></span>}
                                        </li>
                                        <li>
                                            <label className='mb-2 label-font-weight'>Size</label><br />
                                            <input class="form-check-input" type="radio" name="size" id="flexRadioDefault1" onChange={(e) => handleChangeSize(e, "Small")} />
                                            <label class="form-check-label radio-small" for="flexRadioDefault1" >
                                                Small
                                            </label>
                                            <input class="form-check-input" type="radio" defaultChecked name="size" id="flexRadioDefault1" onChange={(e) => handleChangeSize(e, "Medium")} />
                                            <label class="form-check-label radio-medium" for="flexRadioDefault1">
                                                Medium
                                            </label>
                                            <input class="form-check-input" type="radio" name="size" id="flexRadioDefault1" onChange={(e) => handleChangeSize(e, "Large")} />
                                            <label class="form-check-label radio-large" for="flexRadioDefault1">
                                                Large
                                            </label><br />
                                            {errors?.size && <span className="error-message">{errors?.size}<br /></span>}

                                        </li>
                                    </ul>
                                    <ul className='personalInfo_ul'>
                                        <li className='personalInfo_li'>
                                            <label className='mt-3 label-font-weight'>Breed</label><br />
                                            <input className="form-input"
                                                type="Text"
                                                name="breed"
                                                value={petDetails.breed}
                                                maxLength={30}
                                                placeholder='Ex Bull Dog'
                                                onChange={handleChangePet} /><br />
                                            {errors?.breed && <span className="error-message">{errors?.breed}<br /></span>}
                                        </li>

                                        <li>
                                            <label className='label-font-weight'>Pet Type</label><br />
                                            <Form.Select className="dropdown-pettype" aria-label="Default select example" name="petType" style={{ "padding": "13px 13px", "margin-top": "10px" }} onChange={handleChangePet}>
                                                <option value="Dog">Dog</option>
                                                <option value="Cat" >Cat</option>

                                            </Form.Select>
                                            {errors?.AddpetType && <span className="error-message">{errors?.AddpetType}<br /></span>}
                                        </li>
                                    </ul>
                                    <ul className='personalInfo_ul'>
                                        <li>
                                            <div class="form-check form-switch mt-3">
                                                <label class="mb-2 label-font-weight" for="flexSwitchCheckDefault">Vaccination Current?</label>
                                                <input class="form-check-input mb-3" type="checkbox" name="vaccination" checked={petDetails.vaccination} data-toggle="toggle"  id="flexSwitchCheckDefault"  onClick={handleChangePet} /><br />
                                               
                                                {errors?.vaccination && <span className="error-message">{errors?.vaccination}<br /></span>}
                                            </div>
                                            {<span className="sucess-message"> {messages}</span>}
                                        </li>
                                    </ul>
                                    <ul className='personalInfo_ul'>
                                        <li>
                                            <button className="submit-button-pt" style={{ "backgroundColor": "#EE8A38", "marginTop": "10px" }} type="submit" >Submit</button>
                                        </li>
                                        <li></li>
                                    </ul>
                                    <div className="form-footer">

                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* </Col>
                        <Col md={6} lg={4}> */}
                        <div className="form-container">



                        </div>
                        {/* </Col>
                        <Col lg={4}>

                        </Col> */}
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
                <MDBTabsPane show={iconsActive === 'tab2'}>
                    <Row>
                        <MDBTable className='request_table align-items-center' text-align='center' bordered responsive style={{ "text-align": "center" }} >
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Pet Name</th>
                                    <th scope='col'>Pet Details</th>
                                    <th scope='col'>Vaccination</th>
                                    <th scope='col'>Age</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </MDBTableHead>
                            {getPetDetails?.map((pet) =>
                                <MDBTableBody>
                                    <tr>
                                        <td>
                                            <div >
                                                <p className=' mb-1'>{pet.petName.charAt(0).toUpperCase() + pet.petName.slice(1)}</p>

                                            </div>

                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{pet.petType}{", "}{pet.breed.charAt(0).toUpperCase() + pet.breed.slice(1)}</p>
                                            <p className='text-muted mb-0'>{pet.gender}{", "}{pet.size}</p>
                                        </td>
                                        <td>
                                            <MDBBadge color='success' pill>
                                                {pet.vacination}
                                            </MDBBadge>
                                        </td>
                                        <td>{pet.age} {pet.age === "1" ? "Year" : "Years"}</td>
                                        <td>
                                            <Button rounded size='sm' style={{ "background": "blue", "border": "none", "width": "30%", "marginRight": "20px" }} onClick={() => editPetHandler(pet)} >
                                                Edit
                                            </Button>
                                            <Button style={{ "background": "red", "border": "none" }} rounded size='sm' onClick={() => petDeleteHandler(pet)}>
                                                Delete
                                            </Button>

                                        </td>
                                    </tr>

                                </MDBTableBody>
                            )}
                            {show &&
                                <Modal id="editPet-popup" show={show} onHide={handleClose} style={{ "height": "auto !important" }}>
                                    {/* <Modal.Header closeButton>
                                       
                                    </Modal.Header> */}
                                    <Modal.Body>
                                        <ul className='personalInfo_ul'>
                                            <li className='personalInfo_li'>
                                                <Modal.Title>
                                                    <b>Edit pet</b>
                                                </Modal.Title>
                                            </li>
                                        </ul>
                                        <ul className='personalInfo_ul'>
                                            <li className='personalInfo_li'>

                                                <label>Pet Name</label><br />
                                                <input className="form-input"
                                                    type="Text"
                                                    name="petName"
                                                    value={petDetails.petName}
                                                    required minLength={5} maxLength={50}
                                                    onChange={handleChangePet} />
                                                {errors?.petName && <span className="error-message">{errors?.petName}<br /></span>}
                                            </li>
                                            <li>
                                                <label>Pet Type</label><br />
                                                <Form.Select aria-label="Default select example" name="petType" defaultValue={petDetails?.petType} style={{ "padding": "13px 13px", "margin-top": "10px" }} onChange={handleChangePet}>
                                                    <option>pet type</option>
                                                    <option value="Dog">Dog</option>
                                                    <option value="Cat">Cat</option>

                                                </Form.Select>

                                            </li>
                                        </ul>
                                        <ul className='personalInfo_ul'>
                                            <li className='personalInfo_li'>
                                                <label className=' mb-2'>Gender</label><br />
                                                <input class="form-check-input" type="radio" value="Male" checked={petDetails.gender === "Male"} name="gender" id="flexRadioDefault1" onChange={(e) => handleChangeSize(e, "Male")} />
                                                <label class="form-check-label" style={{ "padding": "0px 114px 0px 10px" }} for="flexRadioDefault1">
                                                    Male
                                                </label>
                                                <input class="form-check-input" type="radio" value="Female" checked={petDetails.gender === "Female"} name="gender" id="flexRadioDefault1" onChange={(e) => handleChangeSize(e, "Female")} />
                                                <label class="form-check-label" style={{ "padding": "0px 40px 0px 10px" }} for="flexRadioDefault1">
                                                    Female
                                                </label>


                                            </li>
                                            <li>
                                                <label className='mb-2'>Size</label><br />
                                                <input class="form-check-input" type="radio" name="size" checked={petDetails.size === "Small"} id="flexRadioDefault1" onChange={(e) => handleChangeSize(e, "Small")} />
                                                <label class="form-check-label" style={{ "padding": "0px 30px 0px 10px" }} for="flexRadioDefault1" >
                                                    Small
                                                </label><br />
                                                <input class="form-check-input" type="radio" name="size" checked={petDetails.size === "Medium"} id="flexRadioDefault1" onChange={(e) => handleChangeSize(e, "Medium")} />
                                                <label class="form-check-label" style={{ "padding": "0px 30px 0px 10px" }} for="flexRadioDefault1">
                                                    Medium
                                                </label><br />
                                                <input class="form-check-input" type="radio" name="size" checked={petDetails.size === "Large"} id="flexRadioDefault1" onChange={(e) => handleChangeSize(e, "Large")} />
                                                <label class="form-check-label" style={{ "padding": "0px 40px 0px 10px" }} for="flexRadioDefault1">
                                                    Large
                                                </label><br />
                                            </li>
                                        </ul>
                                        <ul className='personalInfo_ul'>
                                            <li className='personalInfo_li'>
                                                <label >Breed</label><br />
                                                <input className="form-input"
                                                    type="Text"
                                                    name="breed"
                                                    value={petDetails?.breed}
                                                    onChange={handleChangePet} /><br />
                                                {errors?.breed && <span className="error-message">{errors?.breed}<br /></span>}
                                            </li>
                                            <li>
                                                <label className='mt-3'>Age (in years)</label><br />
                                                <input className="form-input"
                                                    type="text"
                                                    name="age"
                                                    value={petDetails?.age}
                                                    onChange={handleChangePet} />
                                                {errors?.age && <span className="error-message">{errors?.age}<br /></span>}
                                            </li>
                                        </ul>
                                        <ul className='personalInfo_ul'>
                                            <li className='personalInfo_li'>
                                                <div class="form-check form-switch " style={{ "margin-top": "20px" }}>
                                                    <label class="mb-2" for="flexSwitchCheckDefault">Vaccination Current?</label>

                                                    <input class="form-check-input mb-3" type="checkbox"  name="vaccination" id="flexSwitchCheckDefault" defaultChecked onChange={handleChangePet} /><br />
                                                    {errors?.vaccination && <span className="error-message">{errors?.vaccination}<br /></span>}
                                                </div>
                                            </li>

                                        </ul>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button style={{ "backgroundColor": "#EE8A38", "border": "none" }} onClick={() => editPet(petDetails.id)} >
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            }
                            {selectedDeletePetlist &&
                                <Modal id="Delete-popup" show={deleteShow} onHide={handleDeleteClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Pet</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to delete ?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleDeleteClose}>
                                            Close
                                        </Button>
                                        <Button variant="danger" onClick={() => deletePet(selectedDeletePetlist?.id)}>
                                            Delete
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            }
                        </MDBTable>
                    </Row>
                </MDBTabsPane>
            </MDBTabsContent>

        </div>
    )
}

export default PetInfo