import React, { useState, useEffect } from 'react'
import Footer from '../Components/Navbar/Footer'
import Header from '../Components/Navbar/Header';
import moment from "moment"
import axios from "axios"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import { useNavigate } from 'react-router-dom';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from "recharts";
// var initialdata = [
//     { x: "Jan", y: 0, z: 0 },
//     { x: "Feb", y: 0, z: 0 },
//     { x: "Mar", y: 0, z: 0 },
//     { x: "Apr", y: 0, z: 0 },
//     { x: "May", y: 0, z: 0 },
//     { x: "Jun", y: 0, z: 0 },
//     { x: "Jul", y: 0, z: 0 },
//     { x: "Aug", y: 0, z: 0 },
//     { x: "Sep", y: 0, z: 0 },
//     { x: "Oct", y: 0, z: 0 },
//     { x: "Nov", y: 0, z: 0 },
//     { x: "Dec", y: 0, z: 0 },
// ];
var initialdata;
function Findahost() {
    const { authData } = useSelector((state) => state.UserReducer)
    const [members, setMembers] = useState([]);
    const [zipCode, setZipcode] = useState();
    const [startDate, setStartDate] = useState()
    const [endDate, setEndtDate] = useState()
    const [hostCount, setHostCount] = useState()
    const [filterFormDate, setFilterFormDate] = useState()
    const [filterToDate, setFilterToDate] = useState()
    const navigate = useNavigate();

    let curr_day = new Date();

    let curr_month_value =
        (String(curr_day.getUTCMonth() + 1) !== "13" ? String(curr_day.getUTCMonth() + 1) : String(curr_day.getUTCMonth() - 9)) ||
        (String(curr_day.getUTCMonth() + 1) !== "14" ? String(curr_day.getUTCMonth() + 1) : String(curr_day.getUTCMonth() - 8)) ||
        (String(curr_day.getUTCMonth() + 1) !== "15" ? String(curr_day.getUTCMonth() + 1) : String(curr_day.getUTCMonth() - 7));
    let monthOne_value =
        (String(curr_day.getUTCMonth() + 2) !== "13" ? String(curr_day.getUTCMonth() + 2) : String(curr_day.getUTCMonth() - 9)) ||
        (String(curr_day.getUTCMonth() + 2) !== "14" ? String(curr_day.getUTCMonth() + 2) : String(curr_day.getUTCMonth() - 8)) ||
        (String(curr_day.getUTCMonth() + 2) !== "15" ? String(curr_day.getUTCMonth() + 2) : String(curr_day.getUTCMonth() - 7));
    let monthTwo_value =
        (String(curr_day.getUTCMonth() + 3) !== "13" ? String(curr_day.getUTCMonth() + 3) : String(curr_day.getUTCMonth() - 9)) ||
        (String(curr_day.getUTCMonth() + 3) !== "14" ? String(curr_day.getUTCMonth() + 3) : String(curr_day.getUTCMonth() - 8)) ||
        (String(curr_day.getUTCMonth() + 3) !== "15" ? String(curr_day.getUTCMonth() + 3) : String(curr_day.getUTCMonth() - 7));

    const Curr_month = moment(curr_month_value).format("MMM")
    const Curr_monthOne = moment(monthOne_value).format("MMM")
    const Curr_monthTwo = moment(monthTwo_value).format("MMM")

    initialdata = [
        { x: Curr_month, y: 0, z: 0 },
        { x: Curr_monthOne, y: 0, z: 0 },
        { x: Curr_monthTwo, y: 0, z: 0 }
    ]

    var [data, setData] = useState([
        initialdata
    ])

    useEffect(() => {
        const getData = async () => {
            await axios.get("http://localhost:5000/api/eventschedule").then((response) => {
                setMembers(response.data);
                const eventList = response.data.filter((e) => (moment(e.start_Date).format('MMM') === initialdata[0].x) ||
                    (moment(e.start_Date).format('MMM') === initialdata[1].x) ||
                    (moment(e.start_Date).format('MMM') === initialdata[2].x))
                    .map((member) => {
                        return { x: moment(member.start_Date).format('MMM'), y: moment(member.start_Date).format('DD') }
                    })
                if (eventList?.length > 0) {
                    setData(initialdata.concat(eventList))
                    setHostCount(eventList?.length)
                }
            });
        }

        getData()
       
        localStorage.removeItem("SEARCH-DATA")

    }, []);
    const today = moment().format("DD")
    const CustomRangeFilterInput = ({ openCalendar, value }) => {
        let from, to;
        if (value[0] && value[1]) {
            from = moment(value[0]).format('MM-DD-YYYY') || ""
            to = moment(value[1]).format('MM-DD-YYYY') || ""
            localStorage.setItem("SEARCH-DATA", JSON.stringify({ "fromDate": from, "toDate": to }));
        }
        else
            if (value[0]) {
                from = moment(value[0]).format('MM-DD-YYYY') || ""
                to = ""
                localStorage.setItem("SEARCH-DATA", JSON.stringify({ "fromDate": from }));
            } else {
                let searchdata = JSON.parse(localStorage.getItem('SEARCH-DATA'))
                // if (searchdata) {
                //     from = JSON.stringify(searchdata?.fromDate).replaceAll(`"`, ``)
                //     to = JSON.stringify(searchdata?.toDate).replaceAll(`"`, ``)
                // } else {
                from = value[0] || ""
                to = value[0] || ""
                localStorage.removeItem("SEARCH-DATA")
                // }
            }

        value = from && to ? from + " ~ " + to : from
        setFilterFormDate(from)
        setFilterToDate(to)
        return (
            <>
                <label>Dates</label><br />
                <input
                    className="form-input"
                    style={{ "width": " 293px", "border": "1px solid #ced4da", "padding": "10px" }}
                    onFocus={openCalendar}
                    value={value}
                    readOnly
                    placeholder='MM-DD-YYYY ~ MM-DD-YYYY'
                />

            </>
        )
    }
    const handleZipcode = (e) => {
        setZipcode(e.target.value)
    }
    const handleStartdate = (e) => {
        setStartDate(e.target.value)
    }
    const handleEnddate = (e) => {
        setEndtDate(e.target.value)
    }

    const findHost = () => {

        const getZipcodeData = async () => {
            const zipcodeFilter = await axios.get(`http://localhost:5000/api/findhost/${zipCode}`)

            if (!filterFormDate && !filterToDate) {
                let eventList = zipcodeFilter.data.map((member) => {
                    return { x: moment(member.start_Date).format('MMM'), y: moment(member.start_Date).format('DD') }
                })
                if (eventList?.length > 0) {
                    data.length = 0
                    setData(initialdata.concat(eventList))
                    setHostCount(eventList?.length)

                }
            }
            const SDFileter = zipcodeFilter.data.filter(
                (member) =>{
                    return (moment(filterFormDate).isSameOrAfter(moment(member.start_Date), 'day')
                        && moment(filterFormDate).isSameOrBefore(moment(member.end_Date), 'day'))
                        ||
                        (moment(filterToDate).isSameOrAfter(moment(member.start_Date), 'day')
                            && moment(filterToDate).isSameOrBefore(moment(member.end_Date), 'day'))
                        ||
                        (moment(filterFormDate).isBefore(moment(member.start_Date), 'day')
                            && moment(filterToDate).isAfter(moment(member.end_Date), 'day'))
                }
            )
            let eventList = SDFileter.map((member) => {
                return { x: moment(member.start_Date).format('MMM'), y: moment(member.start_Date).format('DD') }
            })

            if (eventList?.length > 0) {
                data.length = 0
                setData(initialdata.concat(eventList))
                setHostCount(eventList?.length)
            }

        }

        if (zipCode && filterFormDate) {
            getZipcodeData()
        }
        if (!filterFormDate && !filterToDate) {
            getZipcodeData()
        }

        if (filterFormDate && !filterToDate) {
            const SDFileter = members.filter(
                (member) =>
                (moment(filterFormDate).isSameOrAfter(moment(member.start_Date))
                    && moment(filterFormDate).isSameOrBefore(moment(member.end_Date)))
            )
            let eventList = SDFileter.map((member) => {
                return { x: moment(member.start_Date).format('MMM'), y: moment(member.start_Date).format('DD') }
            })
            if (eventList?.length > 0) {
                data.length = 0
                setData(initialdata.concat(eventList))
                setHostCount(eventList?.length)
            }
        }

        if (filterToDate && filterFormDate) {
            const BetweenDateFileter = members.filter(
                (member) => {

                    return (moment(filterFormDate).isSameOrAfter(moment(member.start_Date), 'day')
                        && moment(filterFormDate).isSameOrBefore(moment(member.end_Date), 'day'))
                        ||
                        (moment(filterToDate).isSameOrAfter(moment(member.start_Date), 'day')
                            && moment(filterToDate).isSameOrBefore(moment(member.end_Date), 'day'))
                        ||
                        (moment(filterFormDate).isBefore(moment(member.start_Date), 'day')
                            && moment(filterToDate).isAfter(moment(member.end_Date), 'day'))


                }
            )
            console.log("SDFileter", BetweenDateFileter)

            let eventList = BetweenDateFileter.map((member) => {
                return { x: moment(member.start_Date).format('MMM'), y: moment(member.start_Date).format('DD') }
            })
            if (eventList?.length > 0) {
                data.length = 0
                setData(initialdata.concat(eventList))
                setHostCount(eventList?.length)
            }
        }
        //     if (filterFormDate) {
        //         const EDFileter = members.filter(
        //             (member) =>
        //                 (moment(member.start_Date).format('YYYY/MM/DD') === filterFormDate)
        //         )
        //         let eventList = EDFileter.map((member) => {
        //             return { x: moment(member.start_Date).format('MMM'), y: moment(member.start_Date).format('DD') }
        //         })
        //         if (eventList?.length > 0) {
        //             data.length = 0
        //             setData(initialdata.concat(eventList))
        //             setHostCount(eventList?.length)
        //         }

        //     }
    }
    const handleBooknow = () => {
        navigate('/login', { state: { pathaname: "findahost", zipCode: zipCode } })
    }

    return (
        <div>
            <Header />
            <section id='find-host'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 pt-4'>
                            <div className="form-container">
                                <div>
                                    <div>
                                        <h5 className="social-media-title">Filters</h5>
                                        <div>
                                            <DatePicker
                                                range
                                                eachDaysInRange
                                                minDate={new Date().setDate(today, "days")}
                                                render={<CustomRangeFilterInput />}
                                                plugins={[
                                                    <Toolbar
                                                        position="bottom"
                                                        sort={["deselect", "close", "today"]}
                                                    />,
                                                ]}
                                            />
                                            <label>Zip Code</label>
                                            <input className="form-input"
                                                type="text"
                                                name="zipcode"
                                                onChange={handleZipcode}
                                            />
                                            {/* <label>From Date</label>
                                            <input className="form-input"
                                                type="date"
                                                name="startdate"
                                                onChange={handleStartdate}
                                            />
                                            <label>To Date</label>
                                            <input className="form-input"
                                                type="date"
                                                name="enddate"
                                                onChange={handleEnddate}
                                            /> */}
                                            <button className="explore-btn" type="submit" onClick={findHost} >Explore</button><br />
                                        </div>
                                    </div>
                                </div>
                                <div className="privacy-policy">
                                    <p> <strong>Note *</strong> Filter with zipcode will get accurate result  </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <p className='mt-5 pt-5 mx-5 px-2'> <b>Number of Hosts available :
                                        <span style={{ "fontSize": "19px" }}> {hostCount}</span></b></p>
                                </div>
                                <div className='col-md-3'>
                                    {authData ?
                                        <Link to={"/member"} ><button className="booking-btn" type="submit" >Book Now</button></Link>
                                        :
                                        <button className="booking-btn" type="submit" onClick={handleBooknow} >Book Now</button>
                                    }

                                </div>
                            </div>
                            <ScatterChart
                                width={800}
                                height={500}
                                margin={{
                                    top: 40,
                                    right: 20,
                                    bottom: 20,
                                    left: 20
                                }}
                            >
                                <CartesianGrid />
                                <XAxis type="category" dataKey="x" name="Month"
                                    allowDuplicatedCategory={false} unit="" label={{ value: "(Months)", position: "bottom" }} />
                                <YAxis domain={[0, 31]} allowDataOverflow tickCount={7} type="number" dataKey="y"
                                    label={{ value: "(Days)", position: "insideLeft", angle: -90, }} name="Date" unit="" />
                                <ZAxis type="number" dataKey="z" name="Hosts" unit="" />
                                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                                <Scatter name="A school" data={data} >
                                    {data.map((entry, index) => (
                                        entry.y > 0 ?
                                            (entry.z > 1 ? <Cell fill="#EE8A38" /> : <Cell fill="#0089ff" />)
                                            : <Cell fill="#fff" style={{ "display": "none" }} />
                                    ))}
                                </Scatter>
                            </ScatterChart>
                            <div style={{ "textAlign": "center", "marginTop": "20px" }}>
                                <span className="dot1"></span><span>Single host Available</span>
                                <span className="dot2"></span><span>More host's Available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Findahost