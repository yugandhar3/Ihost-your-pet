import axios from "axios";


const baseURL= process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api"

const API = axios.create({ baseURL });


//signIn & signUp
export const signIn = (formData) => API.post("/signin", formData);
export const signUp = (formData) => API.post("/signup", formData);

// Member listing API
export const getBookedDetails =(id)=>API.post("/bookedRequest",id)
export const getMembersById =(id)=>API.post(`/members/${id}`)
export const getMember =()=>API.get("/member")
export const findHostById=(id,data)=>API.post(`/findhost/${id}`,data)
export const findHost=(data)=>API.post(`/findhost`,data)
export const requestBooking =(data)=>API.post("/request",data)

/* myprofile API */
//Personal info
export const profileUpdate = (id,formData) => API.put(`/member/${id}`, formData);
export const passwordUpdate = (id,formData) => API.put(`/member/${id}`, formData);

//Pet Info 
export const getPetDetail =(id)=>API.post("/memberpet",id)
export const addPetDetail=(data) => API.post("/memberPets",data)
export const editPetDetail =(id,data)=>API.put(`/memberpet/${id}`,data)
export const deletePetDetail =(id)=>API.delete(`/memberpet/${id}`)
export const getPetDetails=(data) => API.get("/memberPets",data)

//Event schedule
export const getEventDetail =(id)=>API.post("/eventschedulebyId",id)
export const addEventDetail=(data) => API.post("/eventschedule",data)
export const editEventDetail =(id,data)=>API.put(`/eventschedule/${id}`,data)
export const deleteEventDetail =(id)=>API.delete(`/eventschedule/${id}`)

/*Request */
//My Request
export const getMyRequestDetail =(id)=>API.post("/requests",id)
export const editMyRequestDetail =(id,data)=>API.put(`/request/${id}`,data)
export const cancelRequestDetail =(id,data)=>API.put(`/request/${id}`,data)
export const requestBuckPoint= (id,formData) => API.put(`/member/${id}`, formData);

//Pending on me request
export const getPendingOnMeRequestDetail =(id)=>API.post("/requestPendingonme",id)
export const acceptPendingOnMeRequestDetail =(id,data)=>API.put(`/requestPendingonme/${id}`,data)

//Free Bucks tracker
export const getMyBucksDetail =(id)=>API.post(`/memberfbs/${id}`)

//Future api
export const emailvalidate = (formData) => API.post("/user/emailvalidate", formData);
export const forgotpassword = (formData) => API.post("/user/forgotpassword", formData);
export const verifylink = (formData) => API.post("/user/verifylink", formData);
export const updatepassword = (formData) => API.post("/user/updatepassword", formData);
export const deleteAccount = (formData) => API.post("/user/deleteAccount", formData);

