const { PrismaClient } = require("@prisma/client")
const sendEmail = require("../emailNotifications/AwsNotification").sendEmail;
const moment = require("moment")
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient()

const getRequestBooking = async (req, res, next) => {
    const { memberId } = req.body
    try {
        const request = await prisma.request_booking.findMany({
            where: {
                memberId: memberId
            },
            include: {
                member: true,
            }
        })
        const response = await fetchHostDetails(request);
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}

const fetchHostDetails = async (request) => {
    return new Promise(function (resolve, reject) {
        let response = []
        request.forEach(async (args, i) => {
            let host = await prisma.member.findFirst({
                where: {
                    id: args.hostId
                }
            });
            args.host = host
            response.push(args)
            if (request.length - 1 == i) {
                setTimeout(() => {
                    // response
                    resolve(response);
                }, 300);
                // return response
            } else {
                // reject("error");
            }
        });
    });
}

const bookedRequest = async (req, res, next) => {
    const { hostId } = req.body
    try {
        const request = await prisma.request_booking.findMany({
            where: {
                AND: {
                    hostId: hostId
                },
                status: "Accepted"
            }
        })
        res.status(200).send(request)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}
const getRequestBookingPendingOnMe = async (req, res, next) => {
    const { hostId } = req.body
    try {
        const request = await prisma.request_booking.findMany({
            where: {
                hostId: hostId
            },
            include: {
                member: true,
            }
        })
        res.status(200).send(request)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}
const postRequestBooking = async (req, res, next) => {
    const findHost = await prisma.member.findMany({
        where: {
            id: req.body.hostId
        }
    })
    const findMember = await prisma.member.findMany({
        where: {
            id: req.body.memberId
        }
    })
    // const host_email = findHost.filter((h) => h).map((h) => h.email)
    // const guest_email = findMember.filter((m) => m).map((m) => m.email)
    // const hostName = findHost.filter((h) => h).map((h) => h.firstName)
    // const guestName = findMember.filter((m) => m).map((m) => m.firstName)
    const host = findHost.filter((h) => h).map((h) => h)
    const guest = findMember.filter((m) => m).map((m) => m)
    // console.log(host[0].email)
    try {
        //         const memberId = await prisma.request_booking.findMany({
        //             where: {
        //                 memberId: req.body.memberId
        //             }
        //         })
        //         const eventChecking = memberId.filter((member) => member.eventId == req.body.eventId)
        // console.log(eventChecking)
        //         if (eventChecking.length === 0) {
        const request = await prisma.request_booking.create({ data: req.body })
        if (request) {
            const RequestingDates = moment(request.r_start_Date).format("MM-DD-YYYY") + " To " + moment(request.r_end_Date).format("MM-DD-YYYY")
            const RequestedPetType = request.petType
            const RequestedNoOfPetToHost = request.noOfPetToHost
            const days = parseInt(moment(request.r_end_Date).format("DD")) - parseInt(moment(request.r_start_Date).format("DD"))
            const noofDays = days > 1 ? `${days} days` : "1 day"

            const host_data = {
                host_name: host[0].firstName,
                guest_name: guest[0].firstName + " " + guest[0].lastName,
                email: host[0].email,
                start_Date: moment(request.r_start_Date).format("MM-DD-YYYY"),
                end_Date: moment(request.r_end_Date).format("MM-DD-YYYY"),
                RequestedNoOfPetToHost: noofDays,
                subject: "Request for hosting"
            }
            const guest_data = {
                host_name: host[0].firstName + " " + host[0].lastName,
                guest_name: guest[0].firstName,
                email: guest[0].email,
                start_Date: moment(request.r_start_Date).format("MM-DD-YYYY"),
                end_Date: moment(request.r_end_Date).format("MM-DD-YYYY"),
                RequestedNoOfPetToHost: noofDays,
                subject: "Hosting request sent"
            }
            const host_template = path.join(__dirname, '../emailNotifications/views/RBHost.ejs');
            const guest_template = path.join(__dirname, '../emailNotifications/views/RBGuest.ejs');
            // console.log(host_data,guest_data)
            await sendEmail(host_data, host_template)
            await sendEmail(guest_data, guest_template)

            // sendMail(JSON.stringify(email[0]), JSON.stringify(firstName[0]), RequestingDates, RequestedPetType, RequestedNoOfPetToHost, JSON.stringify(hostName[0]))
            //     .then(() => console.log("mail sent....")).catch((eror) => console.log(eror))
        }
        res.status(200).send(request)

    } catch (error) {
        res.status(500).send({ message: "something went wrong", error })
    }
}

const updateRequestBooking = async (req, res, next) => {

    try {
        let query;
        if (req.body.status === "Canceled") {
            query = { status: req.body.status }
        } else {
            query = req.body
        }
        const { id } = req.params
        const Previewsdates = await prisma.request_booking.findFirst({
            where: { id: Number(id) }
        })
        console.log(Previewsdates)
        const requestBookingData = await prisma.request_booking.update({
            where: { id: Number(id) },
            data: query,
        })
        console.log("date changes cr", req.body, requestBookingData)
        const findHost = await prisma.member.findMany({
            where: {
                id: requestBookingData.hostId
            }
        })
        const findMember = await prisma.member.findMany({
            where: {
                id: requestBookingData.memberId
            }
        })
        // const host_email = findHost.filter((h) => h).map((h) => h.email)
        // const guest_email = findMember.filter((m) => m).map((m) => m.email)
        // const hostName = findHost.filter((h) => h).map((h) => h.firstName)
        // const guestName = findMember.filter((m) => m).map((m) => m.firstName)

        const host = findHost.filter((h) => h).map((h) => h)
        const guest = findMember.filter((m) => m).map((m) => m)


        if (req.body.status === "Canceled") {
            const host_data = {
                host_name: host[0].firstName,
                guest_name: guest[0].firstName + " " + guest[0].lastName,
                email: host[0].email,
                start_Date: moment(requestBookingData.r_start_Date).format("MM-DD-YYYY"),
                end_Date: moment(requestBookingData.r_end_Date).format("MM-DD-YYYY"),
                subject: "Cancel request"
            }
            const guest_data = {
                host_name: host[0].firstName + " " + host[0].lastName,
                guest_name: guest[0].firstName,
                email: guest[0].email,
                start_Date: moment(requestBookingData.r_start_Date).format("MM-DD-YYYY"),
                end_Date: moment(requestBookingData.r_end_Date).format("MM-DD-YYYY"),
                subject: "Cancel request "
            }
            const host_template = path.join(__dirname, '../emailNotifications/views/CCBookingDatesHost.ejs');
            const guest_template = path.join(__dirname, '../emailNotifications/views/CCBookingDatesGust.ejs');
            // console.log(host_data, guest_data)
            await sendEmail(host_data, host_template)
            await sendEmail(guest_data, guest_template)
            res.status(200).send(requestBookingData)
        } else {
            const host_data = {
                host_name: host[0].firstName,
                guest_name: guest[0].firstName + " " + guest[0].lastName,
                email: host[0].email,
                start_Date: moment(requestBookingData.r_start_Date).format("MM-DD-YYYY"),
                end_Date: moment(requestBookingData.r_end_Date).format("MM-DD-YYYY"),
                p_start_Date: moment(Previewsdates.r_start_Date).format("MM-DD-YYYY"),
                p_end_Date: moment(Previewsdates.r_end_Date).format("MM-DD-YYYY"),
                subject: "Change in hosting request dates"
            }
            const guest_data = {
                host_name: host[0].firstName + " " + host[0].lastName,
                guest_name: guest[0].firstName,
                email: guest[0].email,
                start_Date: moment(requestBookingData.r_start_Date).format("MM-DD-YYYY"),
                end_Date: moment(requestBookingData.r_end_Date).format("MM-DD-YYYY"),
                p_start_Date: moment(Previewsdates.r_start_Date).format("MM-DD-YYYY"),
                p_end_Date: moment(Previewsdates.r_end_Date).format("MM-DD-YYYY"),
                subject: "Change in hosting request dates "
            }
            const host_template = path.join(__dirname, '../emailNotifications/views/CRBookingDatesHost.ejs');
            const guest_template = path.join(__dirname, '../emailNotifications/views/CRBookingDatesGust.ejs');
            // console.log(host_data, guest_data)
            await sendEmail(host_data, host_template)
            await sendEmail(guest_data, guest_template)
            res.status(200).send(requestBookingData)
        }

    } catch (error) {
        res.status(500).send({ message: "something went wrong", error })
    }
}
const updateRequestBookingPendingOnMe = async (req, res, next) => {
    try {
        const { id } = req.params
        const requestBookingData = await prisma.request_booking.update({
            where: { id: Number(id) },
            data: req.body,
        })
        const findHost = await prisma.member.findMany({
            where: {
                id: requestBookingData.hostId
            }
        })
        console.log("acc cr", requestBookingData.noOfPetToHost)
        const findMember = await prisma.member.findMany({
            where: {
                id: requestBookingData.memberId
            }
        })
        // const host_email = findHost.filter((h) => h).map((h) => h.email)
        // const guest_email = findMember.filter((m) => m).map((m) => m.email)
        // const hostName = findHost.filter((h) => h).map((h) => h.firstName)
        // const guestName = findMember.filter((m) => m).map((m) => m.firstName)
        const host = findHost.filter((h) => h).map((h) => h)
        const guest = findMember.filter((m) => m).map((m) => m)

        if (req.body.status === "Accepted") {
            const host_data = {
                host_name: host[0].firstName,
                guest_name: guest[0].firstName + " " + guest[0].lastName,
                email: host[0].email,
                start_Date: moment(requestBookingData.r_start_Date).format("MM-DD-YYYY"),
                end_Date: moment(requestBookingData.r_end_Date).format("MM-DD-YYYY"),
                subject: "Request confirmation",
                phone_no: host[0].phoneNo,
                pet_count:requestBookingData.noOfPetToHost === '1'? requestBookingData.noOfPetToHost+" pet ":requestBookingData.noOfPetToHost +" pets "
            }
            const guest_data = {
                host_name: host[0].firstName + " " + host[0].lastName,
                guest_name: guest[0].firstName,
                email: guest[0].email,
                start_Date: moment(requestBookingData.r_start_Date).format("MM-DD-YYYY"),
                end_Date: moment(requestBookingData.r_end_Date).format("MM-DD-YYYY"),
                subject: "Request confirmation",
                pet_acceptance_time: host[0].PetAcceptingTime === "Anytime" ? " at " + host[0].PetAcceptingTime : " in " + host[0].PetAcceptingTime,
                phone_no: host[0].phoneNo,
                Address: host[0].streetAddress+", "+host[0].city + ", " + host[0].state + ", " + host[0].zipCode,
                pet_count:requestBookingData.noOfPetToHost === '1'? requestBookingData.noOfPetToHost+" pet ":requestBookingData.noOfPetToHost +" pets "

            }

            const host_template = path.join(__dirname, '../emailNotifications/views/ARHost.ejs');
            const guest_template = path.join(__dirname, '../emailNotifications/views/ARGuest.ejs');

            await sendEmail(host_data, host_template);
            sendEmail(guest_data, guest_template);
            res.status(200).send(requestBookingData);
        }
        if (req.body.status === "Rejected") {
            const host_data = {
                host_name: host[0].firstName,
                guest_name: guest[0].firstName + " " + guest[0].lastName,
                email: host[0].email,
                start_Date: moment(requestBookingData.r_start_Date).format("MM-DD-YYYY"),
                end_Date: moment(requestBookingData.r_end_Date).format("MM-DD-YYYY"),
                subject: "Request declined"
            }
            const guest_data = {
                host_name: host[0].firstName + " " + host[0].lastName,
                guest_name: guest[0].firstName,
                email: guest[0].email,
                start_Date: moment(requestBookingData.r_start_Date).format("MM-DD-YYYY"),
                end_Date: moment(requestBookingData.r_end_Date).format("MM-DD-YYYY"),
                subject: "Request declined"
            }
            const host_template = path.join(__dirname, '../emailNotifications/views/RRHost.ejs');
            const guest_template = path.join(__dirname, '../emailNotifications/views/RRGuest.ejs');
            // console.log(host_data,guest_data)
            await sendEmail(host_data, host_template)
            await sendEmail(guest_data, guest_template)
            res.status(200).send(requestBookingData)
        }

    } catch (error) {
        res.status(500).send({ message: "something went wrong", error })
    }
}

module.exports = {
    getRequestBooking,
    postRequestBooking,
    getRequestBookingPendingOnMe,
    updateRequestBooking,
    updateRequestBookingPendingOnMe,
    bookedRequest
}