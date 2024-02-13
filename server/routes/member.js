const router = require('express').Router();
const { getMembers,
    postMember,
    signIn,
    signUp,
    getFilterMembers,
    getFilterWithOutMembers,
    getMember,
    updateProfile,
    memberDetails } = require("../controller/member");
const { getMembersPets, postMemberPets, updatePets, deletePets } = require("../controller/member_pets");
const { getEventScheduled, 
    postEventSchedule, 
    getEventScheduledById, 
    updateEvents, 
    deleteEvents } = require("../controller/event_schedule");
const { getHosts, postHost, getHost } = require("../controller/hosts");
const { getPets, postPets } = require("../controller/pets");
const { postRequestBooking,
    getRequestBooking,
    getRequestBookingPendingOnMe,
    updateRequestBooking,
    updateRequestBookingPendingOnMe,
    bookedRequest } = require("../controller/request_booking")

router.get('/member', getMembers);
router.post("/memberfbs/:id", memberDetails)
router.post('/members/:id', getMember)
router.post("/member", postMember);
router.put("/member/:id", updateProfile);

router.post("/findhost/:id", getFilterMembers)
router.post("/findhost", getFilterWithOutMembers)

router.post('/signin', signIn);
router.post("/signup", signUp);

router.post('/memberpet', getMembersPets);
router.post('/memberPets', postMemberPets);
router.put("/memberpet/:id", updatePets)
router.delete("/memberpet/:id", deletePets)


router.post("/requests", getRequestBooking);
router.post("/request", postRequestBooking);
router.post("/requestPendingonme", getRequestBookingPendingOnMe)
router.put("/request/:id", updateRequestBooking)
router.put("/requestPendingonme/:id", updateRequestBookingPendingOnMe)
router.post("/bookedRequest", bookedRequest)


router.post('/host', getHosts);
router.get('/hosts', getHost)
router.post('/host', postHost);

router.get('/eventschedule', getEventScheduled);
router.post('/eventschedule', postEventSchedule);
router.post('/eventschedulebyId', getEventScheduledById);
router.put("/eventschedule/:id", updateEvents);
router.delete("/eventschedule/:id", deleteEvents);

router.get('/pets', getPets);
router.post('/pets', postPets)

module.exports = router;