import { Container } from '@material-ui/core'
import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav'
import Footer from '../Components/Navbar/Footer'
import Header from '../Components/Navbar/Header'
import "../App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PersonalInfo from '../Components/Myprofile/PersonalInfo';
import PetInfo from '../Components/Myprofile/PetInfo';
import EventInfo from '../Components/Myprofile/EventInfo';
import Request from '../Components/Myprofile/Request';
import FreebuckTracker from '../Components/Myprofile/FreebuckTracker';

function Myprofile() {
    return (
        <div>
            <Header />
            <section id="myprofile">
                <div className='container'>
                {/* <Container > */}
                    <Tab.Container className="myprofile-tabs" id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm ={2} md={4} lg={3}>
                                <Nav variant="pills" className="flex-column myprofile-tabs">
                                    <Nav.Item>
                                        <Nav.Link  className="myprofileLink" eventKey="first">Personal Information</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link  className="myprofileLink" eventKey="second">Pet Information</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="myprofileLink" eventKey="third">Scheduling</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="myprofileLink" eventKey="four">Requests</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="myprofileLink" eventKey="five">Free Bucks Tracker</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="myprofileLink" eventKey="six">Membership</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={10} md={8} lg={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <PersonalInfo />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <PetInfo />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <EventInfo />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="four">
                                        <Request />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="five">
                                        <FreebuckTracker />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="six">
                                        <h1>Membership coming soon !........</h1>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                    <ToastContainer />
                    </div>
                {/* </Container> */}
            </section>
            <Footer />
        </div>
    )
}

export default Myprofile