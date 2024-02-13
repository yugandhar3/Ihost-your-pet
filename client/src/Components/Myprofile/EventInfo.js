import React, { useState, useEffect } from 'react'
import { isEmptyObject } from '../Auth/SignUp';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row';
import moment from "moment";
import DatePicker from "react-multi-date-picker";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBCheckbox } from 'mdb-react-ui-kit';
import {
    MDBIcon,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux'
import axios, { AxiosError } from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import * as api from '../../redux/api/index.js';

function EventInfo() {
    // const { authData } = useSelector((state) => state.UserReducer)
    let authData = JSON.parse(localStorage.getItem('Login'))
    const [iconsActive, setIconsActive] = useState('tab1');
    const [getEventDetails, setGetEventDetails] = useState()
    const [selectedEditEventlist, setSelectedEditEventlist] = useState()
    const [selectedDeleteEventlist, setSelectedDeleteEventlist] = useState()

    const [editEventFormDate, setEditEventFormDate] = useState()
    const [editEventToDate, setEditEventToDate] = useState()
    const [editHandleValue, setEditHandleValue] = useState()
    const formErrors = new FormData();
    const [formDate, setFormDate] = useState(null)
    const [toDate, setToDate] = useState(null)
    const [calenderDateValue, setCalenderDateValue] = useState([])
    const today = moment().format("DD")
    const [deleteShow, setDeleteShow] = useState(false)
    const [messages, setMessages] = useState()
    const [errors, setErrors] = useState();
    const [errmsg, setErrMes] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = (e) => {
        e.stopPropagation()
        setShow(false);
    }
    const handleDeleteClose = () => setDeleteShow(false)
    const [events, setEvents] = useState({
        start_Date: "",
        end_Date: "",
    })

    useEffect(() => {
        const getEventDetail = async () => {
            await api.getEventDetail({ "memberId": authData?.id }).then((res) => {
                let sorted = res.data.sort((a, b) => moment(a?.start_Date) - moment(b?.start_Date));
                console.log(sorted)
                setGetEventDetails(sorted)
            })
        }
        getEventDetail()

    }, [])

    const CustomRangeFilterInput = ({ openCalendar, value }) => {

        let from, to;
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
        setCalenderDateValue(value)
        setFormDate(from)
        setToDate(to)
        return (
            <>
                <label className='label-font-weight'>Select Dates</label><br />
                <input
                    className="form-input "
                    style={{ "width": "262px","border": "1px solid #ced4da", "marginTop": "0px", "padding": "10px" }}
                    onFocus={openCalendar}
                    value={calenderDateValue}
                    readOnly
                    placeholder='MM-DD-YYYY ~ MM-DD-YYYY'
                />

            </>
        )
    }
    const eventHandler = (e) => {
        console.log(events)
        setEvents({ ...events, [e.target.name]: e.target.value });
    }
    const eventValidation = () => {

        const compareDate = getEventDetails.filter((event) => {

            return (moment(formDate).isSameOrAfter(moment(event.start_Date), 'day')
                && moment(formDate).isSameOrBefore(moment(event.end_Date), 'day'))
                ||
                (moment(toDate).isSameOrAfter(moment(event.start_Date), 'day')
                    && moment(toDate).isSameOrBefore(moment(event.end_Date), 'day'))
                ||
                (moment(formDate).isBefore(moment(event.start_Date), 'day')
                    && moment(toDate).isAfter(moment(event.end_Date), 'day'))


        })
        console.log("compareDate", compareDate)


        if (!(formDate)) {
            formErrors["formDate"] = "Dates are required"
        } else if (!compareDate || compareDate.length !== 0) {
            formErrors["formDate"] = "Dates already exist"
        }

        setErrors(formErrors)

    }
    const getEventDetail = async () => {
        await api.getEventDetail({ "memberId": authData?.id }).then((res) => {
            let sorted = res.data.sort((a, b) => moment(a?.start_Date) - moment(b?.start_Date));
            setGetEventDetails(sorted)
        })
    }

    const submitEventDetails = async (e) => {
        // e.preventDefault()
        eventValidation()
        if (isEmptyObject(formErrors)) {
            await api.addEventDetail({
                "start_Date": moment(formDate).format("YYYY-MM-DD").concat("T00:00:00.000Z"),
                "end_Date": moment(toDate).format("YYYY-MM-DD").concat("T00:00:00.000Z"),
                "memberId": authData?.id,
            }).then((res) => {
                console.log("events data", res)
                if (res.status) {
                    getEventDetail()
                    showToastMessageAddEventDetails()
                }
            })
        } else {
            e.preventDefault()
        }
    }
    const eventEditHandler = (event) => {
        setSelectedEditEventlist(event)
        setShow(true)
    }
    const eventDeleteHandler = (event) => {
        setSelectedDeleteEventlist(event)
        setDeleteShow(true)
    }
    const EditEventDateInput = ({ openCalendar, value }) => {
        let from, to;
        from = moment(selectedEditEventlist?.start_Date).format("MM-DD-YYYY");
        to = moment(selectedEditEventlist?.end_Date).format("MM-DD-YYYY");

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
        setEditEventFormDate(from)
        setEditEventToDate(to)
        return (
            <>
                <label>Select Dates</label><br />
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
    const editEventHandler = (e) => {
        setEditHandleValue({ ...editHandleValue, [e.target.name]: e.target.value })
    }

    const editEvent = async (data) => {
      
        if(!(moment(data.start_Date).isSameOrAfter(moment(editEventFormDate)) &&
        moment(data.end_Date).isSameOrAfter(moment(editEventToDate)))){
            await api.editEventDetail(data.id, {
                "start_Date": moment(editEventFormDate).format("YYYY-MM-DD").concat("T00:00:00.000Z"),
                "end_Date": moment(editEventToDate).format("YYYY-MM-DD").concat("T00:00:00.000Z"),
            })
                .then((res) => {
                    if (res.status) {
                        getEventDetail()
                        setShow(false)
                        showToastMessageEditEvent()
                    }
                })
        }else{
            setShow(false)
        }
      
    }
    const deleteEvent = async (id) => {
        await api.deleteEventDetail(id)
            .then((res) => {
                if (res.status) {
                    getEventDetail()
                    setDeleteShow(false)
                    showToastMessageDeleteEvent()
                }
            })
    }
    const showToastMessageEditEvent = () => {
        toast.success('successfully edited your Event', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const showToastMessageDeleteEvent = () => {
        toast.success('successfully deleted your Event', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };


    const showToastMessageAddEventDetails = () => {
        toast.success('successfully added your Events', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const handleIconsClick = (value) => {
        if (value === iconsActive) {
            return;
        }

        setIconsActive(value);
    };
    const notAvailableDays = [];
    getEventDetails?.forEach((selectedlist) => {
        for (let i = moment(selectedlist?.start_Date); i.isSameOrBefore(moment(selectedlist?.end_Date)); i.add(1, 'days')) {
            notAvailableDays.push(i.format('DD-MM-YYYY'))
        }
    })
    return (
        <div>
            <MDBTabs className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink className="tab-heading" style={{ "fontWeight": "700" }} onClick={() => handleIconsClick('tab1')} active={iconsActive === 'tab1'}>
                        <MDBIcon fas icon='chart-pie' className='me-2' /> Add Non-Available Dates
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink className="tab-heading" style={{ "fontWeight": "700" }} onClick={() => handleIconsClick('tab2')} active={iconsActive === 'tab2'}>
                        <MDBIcon fas icon='chart-line' className='me-2' /> View List of Non-Available Dates
                    </MDBTabsLink>
                </MDBTabsItem>

            </MDBTabs>
            <MDBTabsContent>
                <MDBTabsPane show={iconsActive === 'tab1'}>

                    <Row>
                        <div className="form-footer">
                            <p className='note1'><b>Note:</b> Select the dates you are not available to host a pet. Select multiple dates of non-availability by entering your date and then Submit.</p>
                        </div>
                        <Col md={6} lg={4}>
                            <div className="form-container">
                                <div>
                                    <form onSubmit={submitEventDetails}>
                                        <DatePicker
                                            id="eventDeails"
                                            mapDays={({ date }) => {
                                                let nonAvailableDays = notAvailableDays.includes(moment(`${date.month.number}-${date.day}-${date.year}`).format("DD-MM-YYYY"))
                                                if (nonAvailableDays) return {
                                                    disabled: true,
                                                    style: { backgroundColor: "red", color: "white" },

                                                }
                                            }}
                                            range
                                            eachDaysInRange
                                            minDate={new Date().setDate(today, "days")}
                                            maxDate={moment().add(3, 'months').format("YYYY/MM/DD")}
                                            isClearable={true}

                                            render={<CustomRangeFilterInput />
                                            }
                                        />
                                        {errors?.formDate && <span className="error-message">{errors?.formDate}<br /></span>}

                                        <button className="submit-button" style={{ "backgroundColor": "#EE8A38", "marginTop": "10px" }} type="submit" >Submit</button>

                                    </form>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>

                        </Col>
                        <Col lg={4}>

                        </Col>

                    </Row>
                </MDBTabsPane>
                <MDBTabsPane show={iconsActive === 'tab2'}>
                    <MDBTable className='request_table align-items-center' bordered responsive style={{ "textAlign": "center" }}>
                        <MDBTableHead>
                            <tr>
                                <th style={{ "width": "35%" }} scope='col'>Start Date</th>
                                <th style={{ "width": "35%" }} scope='col'>End Date</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </MDBTableHead>
                        {getEventDetails?.map((event) =>
                            <MDBTableBody>
                                <tr>
                                    <td>
                                        <p className='fw-normal mb-1'>{moment(event.start_Date).format("MM-DD-YYYY")}</p>

                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{moment(event.end_Date).format("MM-DD-YYYY")}</p>

                                    </td>

                                    <td>

                                        <>
                                            <Button rounded size='sm' style={{ "background": "blue", "border": "none", "width": "28%", "marginRight": "20px" }} onClick={() => eventEditHandler(event)}>
                                                Edit
                                            </Button>
                                            <Button style={{ "background": "red", "border": "none" }} rounded size='sm' onClick={() => eventDeleteHandler(event)} >
                                                Delete
                                            </Button>
                                        </>



                                    </td>
                                </tr>

                            </MDBTableBody>
                        )}
                    </MDBTable>
                    {selectedEditEventlist &&
                        <Modal id="editrequest-popup" show={show} onHide={handleClose} style={{ "height": "auto !important" }}>
                            <Modal.Header >
                                <Modal.Title>
                                    <b>Edit Event</b>

                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <DatePicker
                                    range
                                    eachDaysInRange
                                    mapDays={({ date }) => {
                                        let nonAvailableDays = notAvailableDays.includes(moment(`${date.month.number}-${date.day}-${date.year}`).format("DD-MM-YYYY"))
                                        if (nonAvailableDays) return {
                                            style: { backgroundColor: "blue", color: "white" },

                                        }
                                    }}
                                    minDate={new Date().setDate(moment().format("DD"), "days")}
                                    render={<EditEventDateInput />}

                                /><br />


                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button style={{ "backgroundColor": "#EE8A38", "border": "none" }} onClick={() => editEvent(selectedEditEventlist)} >
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    }
                    {selectedDeleteEventlist &&
                        <Modal id="Delete-popup" show={deleteShow} onHide={handleDeleteClose} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Event</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete ?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleDeleteClose}>
                                    Close
                                </Button>
                                <Button variant="danger" onClick={() => deleteEvent(selectedDeleteEventlist?.id)}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    }

                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    )
}

export default EventInfo