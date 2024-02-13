import React, { useState, useEffect } from 'react'
import moment from "moment"
import DatePicker from "react-multi-date-picker";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-calendar/dist/Calendar.css';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBCheckbox } from 'mdb-react-ui-kit';
import {
    MDBIcon,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
// import { useSelector } from 'react-redux'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { buckPoints } from "../../redux/actions/BuckPointsAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as api from '../../redux/api/index.js';

function Request() {
    // const { authData } = useSelector((state) => state.UserReducer)
    let authData = JSON.parse(localStorage.getItem('Login'))
    const [iconsActive, setIconsActive] = useState('tab1');
    const [requestDetails, setGetRequestDetails] = useState()
    const [requestPendingOnMe, setGetRequestPendingOnMe] = useState()
    const [selectedRequestlist, setSelectedRequestlist] = useState()
    const [show, setShow] = useState(false);
    const [editRBFormDate, setEditRBFormDate] = useState()
    const [editRBToDate, setEditRBToDate] = useState()
    const [type, setType] = useState("")
    const [requestBooingList, setRequestBooingList] = useState()
    const [getEventDetails, setGetEventDetails] = useState()
    const formErrors = new FormData();
    const dispatch = useDispatch();

    const showToastMessageAcceptStatus = () => {
        toast.success('successfully updated your status', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const showToastMessageCancelRequestBooing = () => {
        toast.success('successfully updated your status', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const showToastMessageEditRequestBooking = () => {
        toast.success('successfully updated your request', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };


    useEffect(() => {
        const getRequestDetails = async () => {
            await api.getMyRequestDetail({ "memberId": authData?.id }).then((res) => {
                let sorted = res.data.sort((a, b) => b?.id - a?.id);
                console.log(sorted)
                setGetRequestDetails(sorted)
            })
        }
        const getRequestPendingOnMe = async () => {
            await api.getPendingOnMeRequestDetail({ "hostId": authData?.id }).then((res) => {
                let sorted = res.data.sort((a, b) => b?.id - a?.id);
                setGetRequestPendingOnMe(sorted)
            })
        }
        getRequestPendingOnMe()
        getRequestDetails()

    }, [type])



    const handleIconsClick = (value) => {
        if (value === iconsActive) {
            return;
        }

        setIconsActive(value);
    };
    const handleClose = (e) => {
        e.stopPropagation()
        setShow(false);
    }
    let notAvailableDays = [];
    let BookedDays = [];
    getEventDetails?.forEach((selectedlist) => {
        for (let i = moment(selectedlist?.start_Date); i.isSameOrBefore(moment(selectedlist?.end_Date)); i.add(1, 'days')) {
            notAvailableDays.push(i.format('DD-MM-YYYY'))
        }
    })

    requestBooingList?.forEach((selectedlist) => {
        for (let i = moment(selectedlist?.r_start_Date); i.isSameOrBefore(moment(selectedlist?.r_end_Date)); i.add(1, 'days')) {
            BookedDays.push(i.format('DD-MM-YYYY'))
        }
    })
    const today = moment().format("DD")
    const handleShow = (request) => {
        const getBookedDates = async () => {
            await api.getBookedDetails({ "hostId": request?.hostId }).then((res) => {
                setRequestBooingList(res.data)
            })
        }
        const getNonAvaliableEvent = async () => {
            await api.getEventDetail({ "memberId": request?.hostId }).then((res) => {
                console.log(res.data)
                setGetEventDetails(res.data)
            })
        }
        setSelectedRequestlist(request)
        setShow(true)
        getBookedDates()
        getNonAvaliableEvent()

    }
    const EditRequestBookingDateInput = ({ openCalendar, value }) => {
        let from, to;
        console.log(selectedRequestlist)
        from = moment(selectedRequestlist?.r_start_Date).format("MM-DD-YYYY");
        to = moment(selectedRequestlist?.r_end_Date).format("MM-DD-YYYY");
        if (value[0] && value[1]) {
            from = moment(value[0]).format('MM-DD-YYYY') || ""
            to = moment(value[1]).format('MM-DD-YYYY') || ""
        }
        else
            if (value[0]) {
                from = moment(value[0]).format('MM-DD-YYYY') || ""
                to = ""
            }

        value = from && to ? from + " ~ " + to : from
        setEditRBFormDate(from)
        setEditRBToDate(to)
        return (
            <>
                <label>Dates</label><br />
                <input
                    className="form-input "
                    style={{ "width": " 323px", "border": "1px solid #ced4da", "marginTop": "0px", "padding": "10px" }}
                    onFocus={openCalendar}
                    value={value}
                    readOnly
                    placeholder='MM-DD-YYYY ~ MM-DD-YYYY'
                />
            </>
        )
    }
    const getRequestDetails = async () => {
        await api.getMyRequestDetail({ "memberId": authData?.id }).then((res) => {
            let sorted = res.data.sort((a, b) => b?.id - a?.id);
            setGetRequestDetails(sorted)
        })
    }
    const editRequestBooking = async (data) => {
        if(!(moment(data.r_start_Date).isSameOrAfter(moment(editRBFormDate)) &&
        moment(data.r_end_Date).isSameOrAfter(moment(editRBToDate)))){
        await api.editMyRequestDetail(data.id, {
            "r_start_Date": moment(editRBFormDate).format("YYYY-MM-DD").concat("T00:00:00.000Z"),
            "r_end_Date": moment(editRBToDate).format("YYYY-MM-DD").concat("T00:00:00.000Z")
        })
            .then((res) => {
                if (res.status) {
                    getRequestDetails()
                    setShow(false)
                    showToastMessageEditRequestBooking()

                }
            })
        }else{
            setShow(false) 
        }
    }
    const cancelRequestBooking = async (request) => {
        await api.cancelRequestDetail(request?.id, {
            "status": "Canceled",
        })
            .then((res) => {
                if (res.status) {
                    getRequestDetails()
                    setShow(false)
                    showToastMessageCancelRequestBooing()

                }
            })
    }
    const getRequestPendingOnMe = async () => {
        await api.getPendingOnMeRequestDetail({ "hostId": authData?.id }).then((res) => {
            let sorted = res.data.sort((a, b) => b?.id - a?.id);
            setGetRequestPendingOnMe(sorted)
        })
    }
    let Count = 0
    const getMemberBucks = async () => {
        await api.getMyBucksDetail(authData?.id)
            .then((res) => {
                res.data.forEach((b) => { Count = b.buckTractorCount })
                if (authData) {
                    // setMyCount(Count)
                }
            })
    }
    const acceptHandler = async (request, type) => {
        console.log(request.memberId)
        const bucksCount = authData?.buckTractorCount
        await api.acceptPendingOnMeRequestDetail(request?.id, { "status": type })
            .then(async (res) => {
                if (res.status) {
                    showToastMessageAcceptStatus()
                    getRequestPendingOnMe()
                    if (type === "Accepted") {
                        const buckCalHost = bucksCount + request?.buckTrackerCount
                        console.log("buckcal", buckCalHost, bucksCount)
                        dispatch(buckPoints(authData?.id, {
                            "buckTractorCount": buckCalHost
                        }))
                        await api.requestBuckPoint(authData?.id, {
                            "buckTractorCount": buckCalHost
                        }).then((res) => {
                            getMemberBucks()
                        })
                        const buckCalMember = request?.member.buckTractorCount - request?.buckTrackerCount
                        console.log("buckcal", buckCalMember, bucksCount)
                        await api.requestBuckPoint(request?.memberId, {
                            "buckTractorCount": buckCalMember
                        })

                    }
                    setType(type)
                }
            })

    }
    return (
        <div>
            <MDBTabs className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink className="tab-heading" style={{ "fontWeight": "700" }} onClick={() => handleIconsClick('tab1')} active={iconsActive === 'tab1'}>
                        <MDBIcon fas icon='chart-pie' className='me-2' /> My Requests
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink className="tab-heading" style={{ "fontWeight": "700" }} onClick={() => handleIconsClick('tab2')} active={iconsActive === 'tab2'}>
                        <MDBIcon fas icon='chart-line' style={{ "fontWeight": "700" }} className='me-2' /> Pending On Me
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={iconsActive === 'tab1'}>
                    <MDBTable className='request_table align-items-center' text-align='center' bordered responsive style={{ "textAlign": "center" }} >
                        <MDBTableHead>
                            <tr>

                                <th scope='col'>Host Name</th>
                                <th scope='col'>Requested Dates</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Pet Type</th>
                                <th scope='col'>Pets to Host</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </MDBTableHead>
                        {requestDetails?.map((request) =>

                            <MDBTableBody>
                                <tr>
                                    <td>
                                        <div className='ms-3'>
                                            <p className=' mb-1'>{request?.host?.firstName}{" "}{request?.host?.lastName}</p>
                                        </div>

                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{moment(request.r_start_Date).format('MM-DD-YYYY')}{" ~ "}{moment(request.r_end_Date).format('MM-DD-YYYY')}</p>
                                    </td>
                                    <td>
                                        {/* <MDBBadge color='success' pill> */}
                                        <p className='fw-normal mb-1'>   {request?.status}</p>
                                        {/* </MDBBadge> */}
                                    </td>
                                    <td>{request?.petType} </td>
                                    <td>
                                        <p className='fw-bold mb-1'> {request?.noOfPetToHost}</p>
                                    </td>
                                    <td>
                                        <div className='d-flex mr-2' style={{ "justify-content": "space-around" }}>

                                            {request?.status == "Pending" ?
                                                <>
                                                    <Button rounded size='sm' style={{ "background": "blue", "border": "none", "width": "50%", "marginRight": "10px" }} onClick={() => handleShow(request)}>
                                                        Edit
                                                    </Button>
                                                    <Button style={{ "background": "red", "border": "none" }} rounded size='sm' onClick={() => cancelRequestBooking(request)}>
                                                        Cancel
                                                    </Button>
                                                </>
                                                :
                                                <>
                                                    <Button color='link' style={{ "background": "red", "border": "none", "marginRight": "10px","width":"50%" }} disabled rounded size='sm' >
                                                         Edit
                                                    </Button>

                                                </>
                                            }
                                            {request?.status == "Rejected" || request?.status == "Canceled" ? 
                                                <Button color='link' style={{ "background": "red", "border": "none" }} disabled rounded size='sm' >
                                                    Cancel
                                                </Button>
                                                : null}
                                            {request?.status == "Accepted" ?
                                                <Button style={{ "background": "red", "border": "none" }} rounded size='sm' onClick={() => cancelRequestBooking(request)}>
                                                    Cancel
                                                </Button>
                                                :
                                                null
                                            }
                                        </div>
                                    </td>
                                </tr>
                            </MDBTableBody>
                        )}
                        {selectedRequestlist &&
                            <Modal id="editrequest-popup" show={show} onHide={handleClose} style={{ "height": "auto !important" }}>
                                <Modal.Header >
                                    <Modal.Title>
                                        <b>Edit Request</b>

                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* <p>Host Available Dates :
                                        <b> {moment(selectedRequestlist?.r_start_Date).format("MM-DD-YYYY")}</b>
                                        {"   To   "}
                                        <b>{moment(selectedRequestlist?.r_end_Date).format("MM-DD-YYYY")}</b>
                                    </p> */}
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
                                        render={<EditRequestBookingDateInput />}

                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button style={{ "backgroundColor": "#EE8A38", "border": "none" }} onClick={() => editRequestBooking(selectedRequestlist)} >
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        }
                    </MDBTable>
                </MDBTabsPane>
                <MDBTabsPane show={iconsActive === 'tab2'}>
                    <MDBTable className='request_table align-items-center' text-align='center' bordered responsive style={{ "textAlign": "center" }} >
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>Guest Name</th>
                                <th scope='col' style={{ "width": "25%" }}>Requested Dates</th>
                                <th scope='col'>Status</th>
                                <th style={{"width": "15%"}}scope='col'>Pet Type</th>
                                <th style={{"width": "15%"}}scope='col'>Pets to Host</th>
                                <th scope='col'>Actions </th>
                            </tr>
                        </MDBTableHead>
                        {requestPendingOnMe?.map((request) =>
                            <MDBTableBody>
                                <tr>

                                    <td>
                                        <div className='ms-3'>
                                            <p className=' mb-1'>{request?.member?.firstName}{" "}{request?.member?.lastName}</p>
                                        </div>

                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{moment(request.r_start_Date).format('MM-DD-YYYY')}{" ~ "}{moment(request.r_end_Date).format('MM-DD-YYYY')}</p>
                                    </td>
                                    <td>
                                        {/* <MDBBadge color='success' pill> */}
                                        <p className='fw-normal mb-1'>{request?.status || type}</p>
                                        {/* </MDBBadge> */}
                                    </td>
                                    <td>{request?.petType} </td>
                                    <td>
                                        <p className='fw-bold mb-1'> {request?.noOfPetToHost}</p>
                                    </td>
                                    <td>
                                        <div className='mr-2' >
                                            {request?.status !== "Pending" &&
                                                <Button size='sm' disabled style={{ "background": "#EE8A38", "border": "none", "display": "grid", "margin-bottom": "14px" ,"margin-left": "10px","padding-left": "13px", "padding-right": "13px"}} >
                                                    Accepted
                                                </Button>
                                            }
                                            {request?.status !== "Pending" && request.status !== "Accepted" &&
                                                <Button size='sm' disabled style={{ "background": "#EE8A38", "border": "none", "display": "grid", "margin-right": "14px","margin-left": "10px","padding-left": "13px", "padding-right": "13px" }} >
                                                    Canceled
                                                </Button>
                                            }
                                            {request?.status === "Accepted" &&
                                                <Button size='sm' style={{ "background": "#EE8A38", "border": "none", "padding-left": "18%", "padding-right": "18%" }} onClick={() => acceptHandler(request, "Rejected")} >
                                                    Cancel
                                                </Button>
                                            }
                                            {request?.status === "Pending" ?
                                                <>
                                                    <Button size='sm' style={{ "background": "blue", "border": "none", "margin-bottom": "10px", "padding-left": "20%", "padding-right": "20%" }} onClick={() => acceptHandler(request, "Accepted")}>
                                                        Accept
                                                    </Button>
                                                    <Button style={{ "background": "red", "border": "none", "padding-left": "20%", "padding-right": "20%" }} size='sm' onClick={() => acceptHandler(request, "Rejected")}>
                                                        Cancel
                                                    </Button>
                                                </>
                                                : null
                                            }
                                        </div>

                                    </td>
                                </tr>


                            </MDBTableBody>
                        )}

                    </MDBTable>
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    )
}

export default Request