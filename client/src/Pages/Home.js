import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Header from '../Components/Navbar/Header';
import Footer from '../Components/Navbar/Footer';
import Carousel from "react-bootstrap/Carousel";
import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
function Home() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const goToTop = () => {
    window.scrollTo(0, 0)
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let win = window.innerWidth <= 760
  console.log(win)
  useEffect(() => {
    if (win) {
      handleShow()
    }
  }, [win])
  let authData = JSON.parse(localStorage.getItem('Login'))
  // const { authData } = useSelector((state) => state.UserReducer)
  const videoRef = useRef();
  const [play, setPlay] = useState(true);

  const handleClick = () => {
    setPlay(true);
  };

  const handleBooknow = () => {
    navigate('/login', { state: { pathaname: "myprofile" } })
  }
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Header />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>iHostYourPet</Modal.Title>
        </Modal.Header>
        <Modal.Body>This website is best viewed on a desktop.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <section
        id="hero-no-slider"
        class="d-flex justify-cntent-center align-items-center">
        <div class="no-padding">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src='./images/slide.jpg'
                alt="First slide"
              />
              <Carousel.Caption>
                <div>
                  <h3>Pet boarding, simplified</h3>
                  <p>
                    Find fellow pet owners to Host your pets for <span class="redtxt">FREE!</span>
                  </p>
                  <Link to="/aboutus"><button className='btn-get-started' style={{ "marginRight": "20px" }} onClick={() => goToTop()}>More about iHostYourPet</button></Link>
                  <Link to="/member" className="btn-get-started" onClick={() => goToTop()}>Find a host</Link>

                </div>
              </Carousel.Caption>
            </Carousel.Item>
            {/* <Carousel.Item>
              <img
                className="d-block w-100"
                src='./images/slide.jpg'
                alt="Second slide"
              />

              <Carousel.Caption>
                <div>
                  <h3>Pet boarding, simplified</h3>
                  <p>
                    Find fellow pet owners to Host your pets for <span class="redtxt">FREE!</span>
                  </p>
                  <Link to="/aboutus"onClick={()=>goToTop()}><button className='btn-get-started' style={{ "marginRight": "20px" }} >More about iHostYourPet</button></Link>
                  <Link to="/member" className="btn-get-started" onClick={()=>goToTop()}>Find a host</Link>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src='./images/slide.jpg'
                alt="Third slide"
              />

              <Carousel.Caption>
                <div>
                  <h3>Pet boarding, simplified</h3>
                  <p>
                    Find fellow pet owners to Host your pets for <span class="redtxt">FREE!</span>
                  </p>
                  <div>
                    <Link to="/aboutus" onClick={()=>goToTop()}><button className='btn-get-started' style={{ "marginRight": "20px" }}>More about iHostYourPet</button></Link>
                    <Link to="/member" className="btn-get-started" onClick={()=>goToTop()}>Find a host</Link>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item> */}
          </Carousel>
        </div>
      </section>
      {/* <section id='happy-pets'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div>
                <img
                  className="d-block w-100"
                  src='./images/happy.png'
                  alt="Second slide"
                />
              </div>
            </div>
            <div className='col-md-6'>
              <h3 className='happy-headding'>Happy Pets,<br />happy humans</h3>
              <p className='happy-text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a
                type specimen book.</p>
                <Link to="/aboutus"><button className='btn-happy'>More about iHostYourPet</button></Link>
            </div>
          </div>
        </div>
      </section> */}
      <h4 style={{ "textAlign": "center", "margin-bottom": "89px" }}>This is a BETA site. We would appreciate your feedback on how we can improve your experience with us.<br /> Please write us at <a href="mailto:ihostyourpet@gmail.com">
        ihostyourpet@gmail.com
      </a>  </h4>
      <div id='howitworks'>
        <div className='container'>
          <div className='row'>
            <div className='work-image-box'>
              <h3 className='work-headding'>How it works</h3>
              <img src='./images/vector-path.png' />
            </div>

            <div className='col-md-6'>
              <div className='list-box1'>
                <ListGroup>
                  <ListGroup.Item>
                    <img
                      src='./images/footprint.png'
                      alt="Third slide"
                    />
                    Become a member, fill out your profile, tell us about you and your pet.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <img
                      src='./images/footprint.png'
                      alt="Third slide"
                    />
                    Search for a member using Find a Host.
                    Find the member available for your dates and contact them by sending Request Booking
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <img
                      src='./images/footprint.png'
                      alt="Third slide"
                    />
                    If all agree, you are all set. Once your request is accepted,
                    points from your account will be transferred to the host. 1 day of hosting = 1 point transferred
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <img
                      src='./images/footprint.png'
                      alt="Third slide"
                    />
                    Board your pets as long as your point balance is not negative.
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='list-box2'>
                <ListGroup>
                  <ListGroup.Item>
                    <img
                      src='./images/footprint.png'
                      alt="Third slide"
                    />
                    Keep your availability calendar in your profile up to date.
                    Accept a Request to Host
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <img
                      src='./images/footprint.png'
                      alt="Third slide"
                    />

                    Once accepted, you will earn the points as they are transferred to your account.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <img
                      src='./images/footprint.png'
                      alt="Third slide"
                    />

                    The more points you earn, the more time you can board your pet.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <img
                      src='./images/footprint.png'
                      alt="Third slide"
                    />

                    All this for FREE! No more high costs of boarding your pets!
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
            <div style={{ "textAlign": "center" }}>
              {authData ?
                <Link className='btn-howitwork' to="/myprofile" onClick={() => goToTop()}>Become a member</Link>
                :
                <button className='btn-howitwork' onClick={() => handleBooknow()}>Become a member</button>
              }
            </div>
          </div>
        </div>
      </div>
      <div id='howitworks' style={{ "textAlign": "center" }}>
        <div className='work-image-box'>
          <h3 className='work-headding'>Product Video</h3>
          <img src='./images/vector-path.png'  />
        </div>
        <div onClick={handleClick} style={{ position: 'relative', cursor: 'pointer' }}>

          {play && (
            <video
              height="300px"
              width="700px"
              controls
              autoPlay
              muted
              src="https://ihostyourpet.s3.us-west-2.amazonaws.com/I+Host+your+pet.mp4"
            ></video>
          )}
        </div>
      </div>
      {/* <section className="aboutus">
      <h1 className='aboutus-header'>Client say about us</h1>
      <Container className='carousel-container '>
      <div className='carousel-icon'>
            <img src="./images/vector-path.png" />
          </div>
          <div className="woof-text">
          <p>WOOF</p>
          </div>
        <Carousel className="button" activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
          
            <Row>
              <Col md={6}>
                <img
                  className="d-block w-100 about-img"
                  src="./images/dog1.png"
                  alt="First slide"
                />
              </Col >
              <Col className='carousel-text' md={6}>
                <p>yugandhar,Susan's dog:</p>
                <p>Kind friendly and profesional,and best</p>
                <p>of all Jame absolutely loved them.I</p>
                <p>Would recommend PetMain to anyone</p>
                <p>looking for dog care.</p>
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col md={6}>
                <img
                  className="d-block w-100 about-img"
                  src="./images/dog1.png"
                  alt="First slide"
                />
              </Col>
              <Col className='carousel-text' md={6}>
                <p>Asha,Susan's dog:</p>
                <p>Kind friendly and profesional,and best</p>
                <p>of all Jame absolutely loved them.I</p>
                <p>Would recommend PetMain to anyone</p>
                <p>looking for dog care.</p>
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col md={6}>
                <img
                  className="d-block w-100 about-img"
                  src="./images/dog1.png"
                  alt="First slide"
                />
              </Col >
              <Col className='carousel-text' md={6}>
                <p>Jame,Susan's dog:</p>
                <p>Kind friendly and profesional,and best</p>
                <p>of all Jame absolutely loved them.I</p>
                <p>Would recommend PetMain to anyone</p>
                <p>looking for dog care.</p>
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>
      </section> */}
      <Footer />
    </>
  );
}

export default Home;
