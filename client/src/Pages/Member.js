import React from 'react'
import MemberList from '../Components/Member/MemberList'
import Footer from '../Components/Navbar/Footer'
import Header from '../Components/Navbar/Header'

function Member() {
  return (
    <div>
        <Header />
        <MemberList />
        <Footer />
    </div>
  )
}

export default Member