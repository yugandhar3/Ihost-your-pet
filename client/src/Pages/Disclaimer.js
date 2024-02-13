import React from 'react'
import Footer from '../Components/Navbar/Footer'
import Header from '../Components/Navbar/Header'

function Disclaimer() {
    return (
        <div>
            <Header />
            <section id="terms-privacy">
                <div className='container'>
                    <h1>Acknowledgement of BETA/ <br />Proof of Concept Status of iHostYourPet</h1>
                    <div className='terms-card'>
                        <div className='termscard-body'>
                            <p>
                                Nature of the iHostYourPet Service. The iHostYourPet Service consists of a desktop Web application, mobile applications, and other related tools, support and services that pet owners
                                (<b>“Pet Owners”</b>)can use to find, communicate with and interact with each other. As of incorporation of these terms, iHostYourPet is in BETA, trial mode, and the services provided are still in the transitory phase. As part of this phase, we provide a limited set of services focused on facilitating only contact between Pet Owners.
                            </p>
                            <p>
                                iHostYourPet.com website and service being provided, till specified, is a Proof of Concept service website. It provides a limited set of functions and services designed to meet the core purpose of the website and the service which is : Provide a method for families with pets to find and communicate with other families with pets to host their pets when available. The service is designed to be a barter service where no money is exchanged for the service of hosting the pets between the members of iHostYourPet. By becoming a member of iHostYourPet in its BETA/Proof of Concept phase the members acknowledge the following:
                                <br/><br/>
                                <ol>
                                    <li>No membership fees or transaction fees will be charged for the 1st year of their membership(from when they register) with iHostYourPet.</li>
                                    <ol className='order-alpha'>
                                        <li>After the first year of membership is over, there will be a not-yet determined monthly or yearly membership fee charged, and a transaction fee for any reservation made using the iHostYourPet service.</li>
                                        <li>No credit card information is required for the 1st year of membership, but maybe required after that period is over.</li>
                                    </ol>
                                    <li>iHostYourPet does not guarantee availability of hosts. During the BETA/Proof of Concept phase we may not have enough members with enough available dates to provide hosting service on expected dates for members.</li>
                                    <li>iHostYourPet provides limited search options for other hosts. As the iHostYourPet service is in early stages, some functions are currently limited, but if the BETA/Proof of Concept phase is successful additional features will be added for members’ convenience. </li>
                                </ol>
                            </p>

                        </div>

                    </div>
                </div>

            </section>
            <Footer />
        </div>
    )
}

export default Disclaimer