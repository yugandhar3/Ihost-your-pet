import React from 'react'
import MemberList from '../Components/Member/MemberList'
import Footer from '../Components/Navbar/Footer'
import Header from '../Components/Navbar/Header'
import { Link } from 'react-router-dom'

function Aboutus() {
  const goToTop =()=>{
    window.scrollTo(0,0)
  };

  return (
    <div>
      <Header />
      <section id='about-us'>
        <div className='container'>
          {/* <h1>Mission Statement</h1> */}
          <div className='mission'>
            <h3>Mission Statement</h3>
           
          </div>
          <p className='about-us-text'>
              Eliminate the expensive cost of boarding pets by providing a service that allows families to host each other’s pets.
            </p>
          <div className='problem'>
            {/* <div className='row'> */}
            {/* <div className='col-md-6'>
                <img className='w-100' src='./images/mission.jpg' />
              </div> */}
            {/* <div className='col-md-6'>
                <div> */}
            {/* <h4>Mission Statement</h4>
                  <p>
                    Eliminate the expensive cost of boarding pets by providing a service that allows families to host each other’s pets.
                  </p> */}
            <h4>The Problem</h4>
            <p>
              Pet boarding costs are getting higher everyday. When a family has to travel, they have to budget for the cost of boarding their pets. It's tough to find good boarding that is also affordable. As a result, families have to alter their travel plans because of the prohibitive costs.
            </p>
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}
          </div>
          <div className='our-solution'>
            <h4>Our Solution</h4>
            <p>
              We provide an online service that allows families to find other families willing to watch/board their pet for free. In return, the boarding family can ask the pet’s family to board their pet next time they need boarding. By building a database of willing families, each family will find somebody to board their pet next time.
            </p>
            <div className='about-gallary'>
              <div className='row'>
                <div className='col-md-4'>
                  <img className='w-100' src='./images/dog2.jpeg' />
                </div>
                <div className='col-md-4'>
                  <img className='w-100' src='./images/our-solution.jpg' />
                </div>
                <div className='col-md-4'>
                  <img className='w-100' src='./images/dog3.png' />
                </div>
              </div>
            </div>
          </div>
          <div className='how-it-works'>
            <h4>How it Works</h4>

            <ul>
              <li>Become a member, fill out your profile, tell us about you and your pet</li>
              <li>
                In your profile, fill out the calendar to show your availability to host a pet for fellow members.
              </li>
              <li><b>Boarding your Pet</b>
                <ul>
                  <li>Search for a member using Find a Host</li>
                  <li>Find the member available for your dates and contact them by sending Request Booking</li>
                  <li>If all agree, you are all set. Once your request is accepted</li>
                  <li>Points from your account will be transferred to the host. 1 day of hosting = 1 point transferred.</li>
                  <li>Board your pets as long as your point balance is not negative.</li>
                </ul>
              </li>
              <li><b>Hosting a Pet</b>
                <ul>
                  <li>Keep your availability calendar in your profile up to date.</li>
                  <li>Accept a Request to Host</li>
                  <li>Once accepted, you will earn the points as they are transferred to your account. </li>
                  <li>The more points you earn, the more time you can board your pet.</li>
                </ul>
              </li>
              <li>
                All this for FREE! No more high costs of boarding your pets!
              </li>
            </ul>
            <b>Note:</b> iHostYourPet is in the Proof of Concept/BETA phase so some features are limited. <Link to="/disclaimer" onClick={()=>goToTop()}>Click here</Link> know more.
               
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Aboutus