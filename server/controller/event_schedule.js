const { PrismaClient } = require("@prisma/client")
const sendEmail = require("../emailNotifications/AwsNotification").sendEmail;
const moment = require("moment")
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient()

const getEventScheduled = async (req, res, next) => {
    const { start_Date, end_Date } = req.body
    console.log(start_Date, end_Date)
    try {
        const events = await prisma.non_availabile_date.findMany({
        })
        res.status(200).send(events)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}

const postEventSchedule = async (req, res, next) => {
    console.log(req.body)
    try {
        const event = await prisma.non_availabile_date.create({ data: req.body })
        res.status(200).send(event)
    } catch (error) {
        res.status(500).send({ message: "something went wrong", error })
    }
}
const getEventScheduledById = async (req, res, next) => {
    const { memberId } = req.body
    try {
        const events = await prisma.non_availabile_date.findMany({
            where: {
                memberId: memberId
            }
        })
        res.status(200).send(events)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}
const updateEvents = async (req, res, next) => {
    try {
        const { id } = req.params
        const previesData= await prisma.non_availabile_date.findFirst({
            where: { id: Number(id) }
        })
        const eventData = await prisma.non_availabile_date.update({
            where: { id: Number(id) },
            data: req.body,
        })
       
        const memberName = await prisma.member.findUnique({
            where: { id:eventData.memberId }
        })
        const data={
            name: memberName.firstName,
            email:memberName.email,
            start_Date:moment(eventData.start_Date).format("MM-DD-YYYY"),
            end_Date:moment(eventData.end_Date).format("MM-DD-YYYY"),
            p_start_Date:moment(previesData.start_Date).format("MM-DD-YYYY"),
            p_end_Date:moment(previesData.end_Date).format("MM-DD-YYYY"),
            subject:"Profile update"
        }
       
        const template=path.join(__dirname, '../emailNotifications/views/EditEvents.ejs');
         await sendEmail(data,template)
         res.status(200).send(eventData)
    } catch (error) {
        res.status(500).send({ message: "something went wrong", error })
    }
}
const deleteEvents = async (req, res, next) => {
    try {
        const { id } = req.params
       
        const eventData = await prisma.non_availabile_date.delete({
            where: { id: Number(id) }
        })
       
        const memberName = await prisma.member.findUnique({
            where: { id:eventData.memberId }
        })
        console.log("eventData",eventData,memberName)
        const data={
            name: memberName.firstName,
            email:memberName.email,
            start_Date:moment(eventData.start_Date).format("MM-DD-YYYY"),
            end_Date:moment(eventData.end_Date).format("MM-DD-YYYY"),
            subject:"Profile update"
        }
        const template=path.join(__dirname, '../emailNotifications/views/DeleteEvents.ejs');
        await sendEmail(data,template)
        await res.status(200).send(eventData)
    } catch (error) {
        res.status(500).send({ message: "something went wrong", error })
    }
}
module.exports = {
    getEventScheduled,
    postEventSchedule,
    getEventScheduledById,
    updateEvents,
    deleteEvents
}