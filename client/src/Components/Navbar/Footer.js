import React from 'react';
import { Link } from 'react-router-dom'
import Logo from "../../../src/assets/images/logo.png";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux'

import "./style.css"



function Footer() {
  const { authData } = useSelector((state) => state.UserReducer)
  const goToTop = () => {
    window.scrollTo(0, 0)
  };

  return (
    <>

      <div className='footer '>

        <Container >
          <div className='footer-body'>

            {/* <Row>
              <Col lg={3} md={3} sm={12}>
                <img className="footer-dog" src='./images/footer-dog.png' />
              </Col> */}
            {/* <Col lg={7} md={6} sm={12}> */}
            <h3 className='footer-body-header'>Are you ready to get started?</h3>
            <div className='footer-body-subheading'>
              {/* <Row>
                    <Col lg={4} md={12} sm={12}>
                    </Col>
                    <Col lg={4} md={12} sm={12}> */}
              <div className='button-icon'>
                <img src="./images/vector-path.png" />
                </div>
                <Link className="booknow" to='/member' onClick={() => goToTop()}>
                  <Button className="booknow" variant="warning">
                    Book now
                  </Button>
                </Link>
            

              {/* </Col>
                    <Col lg={4} md={12} sm={12}>
                    </Col>
                  </Row> */}
              <footer>
                <div className='footer-nav'>
                  <Link to="/termsofservice" className="p-2" onClick={() => goToTop()}>Terms of Service</Link>
                  <Link to="/disclaimer" className="p-2" onClick={() => goToTop()}>Disclaimer</Link>
                  <a className="p-2" href="mailto:iHostYourPet@gmail.com">Contact us</a>
                </div>
              </footer>
            </div>
            {/* </Col>
              <Col lg={2} md={3} sm={12}>
              </Col>

            </Row> */}

          </div>
        </Container>



      </div>

    </>
  )
}

export default Footer