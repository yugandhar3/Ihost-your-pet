import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import * as api from '../../redux/api/index.js';

function FreebuckTracker() {
    // const { authData } = useSelector((state) => state.UserReducer)
    const { buckData } = useSelector((state) => state.BuckReducer)
    let authData = JSON.parse(localStorage.getItem('Login'))
    const [spendBuckCount, setSpendBuckCount]= useState()
    const [myCount, setMyCount]= useState()

//  let sum =0
//   let Count =0
//     useEffect(() => {
//       const getMember= async()=>{
//         await api.getMyBucksDetail(authData?.id)
//         .then((res)=>{
//           res.data.forEach((b)=>{Count = b.buckTractorCount})
//           if(authData){
//           setMyCount(Count)
//           }
//         })
//       }
//       // const getRequestData = async()=>{
//       //   await axios.post("http://localhost:5000/api/requests", { "memberId": authData?.id }).then((res) => {
//       //     res.data.forEach((b)=>{sum= b.buckTrackerCount})
//       //     if(authData){
//       //       setSpendBuckCount(sum)
//       //     }
         
//       // })
//       // }
//       getMember()
//       // getRequestData()
//     })
  return (
    <div>
        <div className="money-details-container">
      <div className="balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="details-img"
        />
        <div>
          <p className="details-text">Credits</p>
          <p className="details-money" testid="balanceAmount">
          {buckData?.buckTractorCount ? buckData?.buckTractorCount:authData?.buckTractorCount} 
          </p>
        </div>
      </div>
      </div>
      {/* <div className="income-container">
        <img
          src="https://icon-library.com/images/assets-icon/assets-icon-11.jpg"
          alt="income"
          className="details-img"
        />
        <div>
          <p className="details-text">Your Credits</p>
          <p className="details-money" testid="incomeAmount">
          {myCount ? myCount:0} 
          </p>
        </div>
      </div>
      <div className="expenses-container">
        <img
          src="https://icon-library.com/images/salary-icon/salary-icon-3.jpg"
          alt="expenses"
          className="details-img"
        />
        <div>
          <p className="details-text">Your Debits</p>
          <p className="details-money" testid="expensesAmount">
            {spendBuckCount ?spendBuckCount :0 }
          </p>
        </div>
      </div>
    </div> */}
    <p className='note'><b>Note :</b> For each day of hosting a single pet, the host will earn 1 credit. Multiple credits will be awarded for the number of pets hosted in a day. </p>
  </div>
  )
}

export default FreebuckTracker