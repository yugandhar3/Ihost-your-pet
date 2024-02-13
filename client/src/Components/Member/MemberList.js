import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./style.css";
import axios from "axios";
import moment from "moment"
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar"
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as api from '../../redux/api/index.js';

function MemberList() {
    const location = useLocation()
    const propZipcode = location?.state?.zipCode

    const [memberList, setMemberList] = useState([])
    const [selectedlist, setSelectedlist] = useState()
    const [data, setData] = useState([])
    const [zipCode, setZipCode] = useState(propZipcode)
    const [error, setError] = useState("")
    const [message, setMessage] = useState()
    const [RequestBookingDetails, setRequestBookingDetails] = useState({
        noOfPetToHost: "1",
        petType: "",
        r_start_Date: "",
        r_end_Date: "",
        hostId: 0,
        memberId: 0,
        eventId: 0
    })
    const [formDate, setFormDate] = useState()
    const [toDate, setToDate] = useState()
    const [filterFormDate, setFilterFormDate] = useState()
    let [filterToDate, setFilterToDate] = useState()
    // const { authData } = useSelector((state) => state.UserReducer)
    let authData = JSON.parse(localStorage.getItem('Login'))
    const [show, setShow] = useState(false);
    const [viewprofile, setViewprofile] = useState(false);
    const [profilelist, setprofilelist] = useState()
    const [requestBooingList, setRequestBooingList] = useState()
    const navigate = useNavigate();
    const [myCount, setMyCount] = useState()
    const [fixMainPosition, setFixMainPosition] = useState(false)
    const[recordsCheck, setRecordsCheck]=useState(false)
    const[noRecordsCheck, setNoRecordsCheck]=useState(false)
    const handleClose = (e) =>{
        e.stopPropagation()
        setShow(false);
    }
    const handleviewprofileClose = () => setViewprofile(false);
    const handleviewprofile = (member) => {
        setprofilelist(member)
        setViewprofile(true)
    }

    const showToastMessage = () => {
        toast.success('Request sent successfully', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const showToastErrorMessage = () => {
        toast.success('Request already exist', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    const showToastCountMessage = () => {
        toast.success('You dont have credits to request', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const showToastMessagefilter = () => {
        toast.success('No result found', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    let Count = 0
    useEffect(() => {
        const getMemberBucks = async () => {
            await api.getMyBucksDetail(authData?.id)
                .then((res) => {
                    res.data.forEach((b) => { Count = b.buckTractorCount })
                    if (authData) {
                        setMyCount(Count)
                    }
                })
        }
        const getBookedDates = async () => {
            await api.getBookedDetails({ "hostId": selectedlist?.id }).then((res) => {
                setRequestBooingList(res.data)
            })
        }
        const getMember = async () => {
            await api.getMembersById(authData?.id).then((res) => {
                if(res.data.length >0){
                if (propZipcode) {
                    const filterZip = res.data.filter((m) => m.zipCode === propZipcode)
                    setData(filterZip)
                } else {
                    navigate(location.pathname, {});
                    setData(res.data)
                }
                setNoRecordsCheck(false)
                setMemberList(res.data)
            }else{
                setNoRecordsCheck(true)
            }
            })
        }

        const getMembers = async () => {
            await api.getMember().then((res) => {
                if(res.data.length >0){
                    setData(res.data)
                    setMemberList(res.data)
                    setNoRecordsCheck(false)
                }else {
                    setNoRecordsCheck(true)
                }
               
            })
        }
        if (!authData) {
            getMembers()
        }
        getMemberBucks()
        getBookedDates()
        getMember()
        if (!authData) {
            localStorage.removeItem("SEARCH-DATA")

        }
        navigate(location.pathname, {})
    }, [selectedlist?.id])

    const notAvailableDays = [];
    selectedlist?.non_availabile_date?.forEach((selectedlist) => {
        for (let i = moment(selectedlist?.start_Date); i.isSameOrBefore(moment(selectedlist?.end_Date)); i.add(1, 'days')) {
            notAvailableDays.push(i.format('DD-MM-YYYY'))
        }
    })

    const BookedDays = [];
    requestBooingList?.forEach((selectedlist) => {
        for (let i = moment(selectedlist?.r_start_Date); i.isSameOrBefore(moment(selectedlist?.r_end_Date)); i.add(1, 'days')) {
            BookedDays.push(i.format('DD-MM-YYYY'))
        }
    })
    const today = moment().format("DD")
    const requestStartDate = moment(selectedlist?.start_Date).format('DD') >= today ? moment(selectedlist?.start_Date).format('DD') : today
    const CustomRangeInput = ({ openCalendar, value }) => {
        let from, to;
        if (value[0] && value[1]) {
            from = moment(value[0]).format('MM-DD-YYYY') || ""
            to = moment(value[1]).format('MM-DD-YYYY') || ""
        }
        else
            if (value[0]) {
                from = moment(value[0]).format('MM-DD-YYYY') || ""
                to = ""
            } else {
                from = value[0] || ""
                to = value[1] || ""

            }


        value = from && to ? from + " ~ " + to : from
        setFormDate(from)
        setToDate(to)
        return (
            <input
                className="form-input"
                style={{ "width": "406px", "border": "1px solid #ced4da", "padding": "10px" }}
                onFocus={openCalendar}
                value={value}
                readOnly
                placeholder='MM-DD-YYYY ~ MM-DD-YYYY'
            />
        )
    }


    const CustomRangeFilterInput = ({ openCalendar, value }) => {
        let from, to;
        if (value[0] && value[1]) {
            from = moment(value[0]).format('MM-DD-YYYY') || ""
            to = moment(value[1]).format('MM-DD-YYYY') || ""
            if (!authData) {
                localStorage.setItem("SEARCH-DATA", JSON.stringify({ "fromDate": from, "toDate": to }));
            }
        }
        else
            if (value[0]) {
                from = moment(value[0]).format('MM-DD-YYYY') || ""
                to = ""
            } else
                if (authData) {
                    let searchdata = JSON.parse(localStorage.getItem('SEARCH-DATA'))
                    if (searchdata) {
                        from = JSON.stringify(searchdata?.fromDate).replaceAll(`"`, ``)
                        to = JSON.stringify(searchdata?.toDate).replaceAll(`"`, ``)

                    } else {
                        from = value[0] || ""
                        to = value[0] || ""

                    }
                    localStorage.removeItem("SEARCH-DATA")
                }
        value = from && to ? from + " ~ " + to : from

        setFilterFormDate(from)
        setFilterToDate(to)
        setFixMainPosition(true)
        return (
            <div>
                <input
                    className="form-input custom-filter"
                    style={{ "border": "1px solid #333333a6", "padding": "15px", "fontSize": "14px" }}
                    onFocus={openCalendar}
                    value={value}
                    readOnly
                    placeholder='MM-DD-YYYY ~ MM-DD-YYYY'
                />

            </div>
        )
    }
    const handleRequest = async () => {
        const petCount = RequestBookingDetails?.noOfPetToHost;
        const bucksCount = authData?.buckTractorCount
        const date1 = new Date(formDate);
        const date2 = new Date(toDate);
        function getDifferenceInDays(date1, date2) {
            const diffInMs = Math.abs(date2 - date1);
            return diffInMs / (1000 * 60 * 60 * 24);
        }
        const days = getDifferenceInDays(date1, date2);
        let daysCount = days + 1;
        const Count = Number(petCount) * daysCount
        if (bucksCount >= Count || bucksCount >= 0) {
            await api.requestBooking({
                "noOfPetToHost": RequestBookingDetails?.noOfPetToHost,
                "petType": selectedlist?.petType,
                "r_start_Date": moment(formDate).format("YYYY-MM-DD").concat("T00:00:00.000Z"),
                "r_end_Date": moment(toDate).format("YYYY-MM-DD").concat("T00:00:00.000Z"),
                "buckTrackerCount": Count,
                "hostId": selectedlist?.id,
                "memberId": authData?.id

            }).then(async (res) => {
                showToastMessage()
                setShow(false)
                setTimeout(() => {
                    setShow(false)
                    setMessage(" ")
                }, 2000)
            })
        } else {
            showToastCountMessage()
            setShow(false)
        }

    }

    const requestHandler = (e) => {
        setRequestBookingDetails({ ...RequestBookingDetails, [e.target.name]: e.target.value });
    }
    const handleShow = (member) => {
        setSelectedlist(member)
        setShow(true)
        setViewprofile(false)
    }

    const options = [];

    for (var i = 1; i <= selectedlist?.noOfPetToHost; i++) {
        options.push(i);
    }



    const handleChangeZipCode = (e) => {
        setZipCode(e.target.value)

    }
    const goToTop = () => {
        window.scrollTo(0, 0)
    };

    const findHost = (e) => {
        e.preventDefault();
        goToTop()
        const getMembers = async () => {
            await api.getMember().then((res) => {
                setData(res.data)
                setMemberList(res.data)
            })
        }
        const getMember = async () => {
            await api.getMembersById(authData?.id).then((res) => {
                setData(res.data)
            })
        }
        const getData = async () => {
            const toDate = filterToDate ? moment(filterToDate).format("YYYY-MM-DD").concat("T00:00:00.000Z") : null;
            await api.findHostById(authData?.id,
                {
                    "start_Date": moment(filterFormDate).format("YYYY-MM-DD").concat("T00:00:00.000Z"),
                    "end_Date": toDate
                }).then((res) => {
                    if (zipCode) {
                        const zipFilter = res.data.filter((m) => m.zipCode === zipCode)
                        setData(zipFilter)
                    } else {
                        setData(res.data)
                    }
                })
        }
        const getWithoutMemberData = async () => {
            await api.findHost(
                {
                    "start_Date": moment(filterFormDate).format("YYYY-MM-DD").concat("T00:00:00.000Z"),
                    "end_Date": moment(filterToDate).format("YYYY-MM-DD").concat("T00:00:00.000Z")
                }).then((res) => {

                    // setData(res.data)
                    if (zipCode) {
                        const zipFilter = res.data.filter((m) => m.zipCode === zipCode)
                        console.log(zipFilter)
                        setData(zipFilter)
                    } else {
                        setData(res.data)
                    }
                })
        }
        if (filterFormDate && filterToDate && zipCode) {
            if (authData) {
                getData()
            } else {
                getWithoutMemberData()
            }
        } else if (filterFormDate && filterToDate) {
            if (authData) {
                getData()
            } else {
                getWithoutMemberData()
            }
        } else if (filterFormDate) {
            if (authData) {
                getData()
            } else {
                getWithoutMemberData()
            }
        } else if (zipCode) {
            console.log("zipcode", zipCode)
            const zipCodeSearch = memberList.filter((member) => member.zipCode === zipCode)
            console.log(zipCodeSearch)
            if (zipCodeSearch?.length > 0) {
                setData(zipCodeSearch)
            } else {
                setRecordsCheck(true)
                setData([])
            }
        }
        else {
            if (authData) {
                getMember()
            } else {
                getMembers()
            }
            setRecordsCheck(false)
        }
    }
    const handleBooknow = () => {
        navigate('/login', { state: { pathaname: "member", zipCode: zipCode } })
    }
   
    return (
        <div>
            <section id="member-section"  >

                <div className="container">
                    <h1>Hosts for your Pets</h1>
                    <Row>
                        <Col sm={12} md={6} lg={4} >
                            <div className="form-container">
                                <div>
                                    <div>
                                        <h5 className="social-media-title">Search By</h5>
                                        <form onSubmit={findHost}>
                                            <label>Date</label><br />

                                            <DatePicker
                                                style={{ "width": "100%", "display": "block" }}
                                                range
                                                eachDaysInRange
                                                minDate={new Date().setDate(today, "days")}
                                                maxDate={moment().add(3, 'months').format("YYYY/MM/DD")}
                                                fixMainPosition={fixMainPosition}
                                                render={<CustomRangeFilterInput />}
                                                plugins={[
                                                    <Toolbar
                                                        position="bottom"
                                                        sort={["deselect", "close", "today"]}
                                                    />,
                                                ]}
                                            /><br />

                                            <label>Zip Code</label>
                                            <input className="form-input"
                                                type="zipcode"
                                                name="zipcode"
                                                value={zipCode}
                                                maxLength={5}
                                                onChange={handleChangeZipCode}
                                                placeholder="12345"

                                            />
                                            <button className="submit-button" type="submit"  >Explore</button>

                                        </form>
                                    </div>
                                    <div className="privacy-policy" >
                                        <p style={{ "font-size": "15px" }}> <strong>Note:</strong> Search using zipcode will get local members.  </p>
                                    </div>
                                </div>
                            </div>

                        </Col>
                        <Col sm={12} md={6} lg={8} >
                            <div className='memberCard'>
                                <Row>
                                    {recordsCheck && 
                                    <>
                                    <h3 style={{"textAlign":"center"}}>Oh No!</h3>
                                    <p style={{"textAlign":"center" ,"font-size": "17px","line-height": "0.7"}}>Looks like there are no hosts available for</p>
                                    <p style={{"textAlign":"center","font-size": "17px","line-height": "0.7"}}> Zipcode {zipCode}</p>
                                    </>
                                   }
                                    {noRecordsCheck && <>
                                        <h3 style={{"textAlign":"center"}}>Oh No!</h3>
                                    <p style={{"textAlign":"center","font-size": "17px","line-height": "0.7"}}>Looks like there are no hosts available</p>
                                    </>}
                                    {data.length > 0 && data?.map((member) =>
                                        <Col sm={12} md={12} lg={6}  >
                                            <div class="well  mini-profile-widget bootdey.com member-card card">
                                                <div class="row">
                                                    <div class="col-md-6" style={{ "margin-top": "-3% !important" }}>
                                                        <div class="image-container">
                                                            <img src="./images/happy.png" class="avatar img-responsive" alt="avatar" />
                                                        </div>

                                                        {authData ?
                                                            <Link className="submit-button1" type="submit" onClick={() => handleviewprofile(member)} >View Profile/Contact</Link>
                                                            :
                                                            <button className="submit-button1" onClick={handleBooknow} type="submit"  >View Profile/Contact</button>
                                                        }
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="details">
                                                            <h5>{member?.firstName?.charAt(0).toUpperCase() + member?.firstName?.slice(1)}<br />
                                                                {member.lastName?.charAt(0).toUpperCase() + member?.lastName?.slice(1)}</h5>
                                                            <hr />
                                                            {/* <div>{member.streetAddress.charAt(0).toUpperCase() + member.streetAddress.slice(1)},
                                                                {member.city.charAt(0).toUpperCase() + member.city.slice(1)},<br />
                                                                {member.state.charAt(0).toUpperCase() + member.state.slice(1)},{member.zipCode}</div> */}
                                                            <div><strong className='member-car-title'>Zip Code</strong> :{member?.zipCode}</div>
                                                            <div><strong className='member-car-title'>Capacity to Host</strong> :{member?.noOfPetToHost}</div>
                                                            <div><strong className='member-car-title'>Pet Type</strong> :{member?.petType}</div><br />
                                                            {authData ?
                                                                <Link className="submit-button1" type="submit" onClick={() => handleShow(member)} >Request Booking</Link>
                                                                :
                                                                <button className="submit-button1" onClick={handleBooknow} type="submit" >Request Booking</button>
                                                            }



                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    )}

                                </Row>
                            </div>
                            {error}
                        </Col>
                    </Row>
                </div >
            </section>
            {selectedlist &&
                <Modal id="request-popup" show={show} onHide={handleClose}  style={{ "height": "auto !important" }}>
                    <Modal.Header  style={{ "paddingBottom": "0px" }}>
                        <Modal.Title>
                            <b>Request Booking</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ "paddingTop": "5px" }}>
                        {myCount < 0 ?
                            <div class="alert alert-danger">
                                <h6>Your credits = {myCount}</h6>
                                To request a booking, credits must be zero or above.

                            </div>
                            : null
                        }
                        <p><img style={{ "paddingRight": "10px" }} src={"./images/user.png"} />{"     "}
                            {selectedlist?.firstName?.charAt(0).toUpperCase() + selectedlist?.firstName?.slice(1).toLowerCase()}{" "}
                            {selectedlist?.lastName?.charAt(0).toUpperCase() + selectedlist?.lastName?.slice(1).toLowerCase()}</p>
                        <div style={{"display":"flex"}}>
                            <p style={{ "margin-top": "5px","margin-right": "147px" }}><span style={{ "marginRight": "6px" }}><img style={{ "paddingRight": "10px" }} src={"./images/calendar.png"} />{"     "} </span>{selectedlist?.PetAcceptingTime}</p>
                            <p style={{"margin-top": "10px"}}><span style={{ "marginRight": "6px","margin-top": "9px" }}>Pet Type  : </span>Dog</p>
                        </div>

                        <label style={{ "color": "red", "marginTop": "5px", "marginBottom": "10px" }}>Select Pets *</label>
                        <Form.Select aria-label="Default select example" name="noOfPetToHost" style={{ "padding": "10px", }}
                            placeholder="select pet count"
                            onChange={requestHandler}>
                            {options.map((value) => <option value={value} >{value}</option>)}
                        </Form.Select>
                        <label style={{ "color": "red" }}>Select Date *</label><br />
                        <DatePicker
                            mapDays={({ date }) => {
                                let nonAvailableDays = notAvailableDays.includes(moment(`${date.month.number}-${date.day}-${date.year}`).format("DD-MM-YYYY"))
                                if (nonAvailableDays) return {
                                    disabled: true,
                                    style: { backgroundColor: "red", color: "white" },

                                }
                                let bookedDays = BookedDays.includes(moment(`${date.month.number}-${date.day}-${date.year}`).format("DD-MM-YYYY"))
                                if (bookedDays) return {
                                    disabled: true,
                                    style: { backgroundColor: "yellow", color: "white" },

                                }
                            }}
                            range
                            eachDaysInRange
                            minDate={new Date().setDate((moment().format("DD")), "days")}
                            maxDate={moment().add(3, 'months').format("YYYY/MM/DD")}
                            render={<CustomRangeInput />} />
                            <p>* Dates in yellow and red indicates occupied and unavailable respectively </p>
                            {/* <span>Dates in red indicates unavailability</span> */}
                    </Modal.Body>
                    <Modal.Footer>
                        {<span className='success-message'>{message}</span>}
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button style={{ "backgroundColor": "#EE8A38", "border": "none" }} onClick={handleRequest}>
                            Request
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
            <div>
                {profilelist &&

                    <Modal id="profile-popup" show={viewprofile} onHide={handleviewprofileClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <b>Profile Details</b>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><img style={{ "paddingRight": "10px" }} src={"./images/user.png"} />{"     "}
                                {profilelist?.firstName?.charAt(0).toUpperCase() + profilelist?.firstName?.slice(1).toLowerCase()}{" "}
                                {profilelist?.lastName?.charAt(0).toUpperCase() + profilelist?.lastName?.slice(1).toLowerCase()}</p>
                            <p><b><img style={{ "paddingRight": "10px" }} src={"./images/location.png"} /></b>
                                {profilelist?.city}{", "}
                                {profilelist?.state}{", "}
                                {profilelist?.zipCode}</p>
                            <p><b>Capacity To host :</b> {profilelist?.noOfPetToHost}</p>
                            <p><b>Pet Accepting Time :</b> {profilelist?.PetAcceptingTime}</p>
                            <p><b>Pet Type : </b>{profilelist?.petType}</p>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button style={{ "backgroundColor": "#EE8A38", "border": "none", "padding": "11px 40px", "fontSize": "17px" }}
                                onClick={() => handleShow(profilelist)} >
                                Request Booking
                            </Button>
                            <Button style={{ "border": "none", "padding": "11px 40px", "fontSize": "17px" }} variant="secondary" onClick={handleviewprofileClose}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default MemberList

