const { PrismaClient } = require("@prisma/client")
const sendEmail = require("../emailNotifications/AwsNotification").sendEmail;
const moment = require("moment")
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient()



const getMember = async (req, res, next) => {
    const { id } = req.params

    try {
        const members = await prisma.member.findMany({
            where: {
                NOT: {
                    id: Number(id)
                }
            }, include: {
                non_availabile_date: true,
                request_booking: true
            }

        })


        res.status(200).send(members)

    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}
const getFilterMembers = async (req, res, next) => {

    const { id } = req.params
    let { start_Date, end_Date } = req.body

    end_Date = end_Date === null ? start_Date : end_Date

    try {
        const members = await prisma.member.findMany({
            where: {
                NOT: {
                    id: Number(id)
                }
            }, include: {
                non_availabile_date: true
            }
        })
        const nonAvailable = await prisma.non_availabile_date.findMany(
            {
                where: {
                    NOT: {
                        memberId: Number(id)
                    },
                    start_Date: {
                        lte: start_Date,
                        lte: end_Date,
                    },
                    end_Date: {
                        gte: end_Date,
                        gte: start_Date
                    },
                },
            })

        const mId = members.map((m) => m)
        const nId = nonAvailable.map((n) => n)
        let matches = mId.reduce(function (prev, value) {

            var isDuplicate = false;
            if (nId.length > 0) {
                for (var i = 0; i < nId.length; i++) {
                    if (value.id == nId[i].memberId) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    prev.push(value);
                }
            } else {
                prev = members
            }

            return prev;

        }, []);
        const bookedFilter = await removeBookedData(matches, start_Date, end_Date, id)
        res.status(200).send(bookedFilter)
    } catch (error) {
        res.status(500).send({ message: "something went wrong", error })
        next(error)
    }
}
const removeBookedData = async (matches, start_Date, end_Date, id) => {
    const bookedDates = await prisma.request_booking.findMany(
        {
            where: {
                NOT: {
                    hostId: Number(id)
                },
                r_start_Date: {
                    lte: start_Date,
                    lte: end_Date,
                },
                r_end_Date: {
                    gte: end_Date,
                    gte: start_Date
                },
                status: "Accepted"
            },
        })

    const mId = matches.map((m) => m)
    const bId = bookedDates.map((b) => b)

    let bookedMatches = mId.reduce(function (prev, value) {

        var isDuplicate = false;
        if (bId.length > 0) {
            for (var i = 0; i < bId.length; i++) {
                if (value.id == bId[i].hostId) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                prev.push(value);
            }
        } else {
            prev = matches
        }

        return prev;

    }, []);

    return bookedMatches

}
const getFilterWithOutMembers = async (req, res, next) => {

    const { start_Date, end_Date } = req.body
    try {
        const members = await prisma.member.findMany({
            include: {
                non_availabile_date: true
            }
        })
        const nonAvailable = await prisma.non_availabile_date.findMany(
            {
                where: {
                    start_Date: {
                        lte: start_Date,
                        lte: end_Date,
                    },
                    end_Date: {
                        gte: end_Date,
                        gte: start_Date
                    },
                },
            })


        const mId = members.map((m) => m)
        const nId = nonAvailable.map((n) => n)

        let matches = mId.reduce(function (prev, value) {

            var isDuplicate = false;
            if (nId.length > 0) {
                for (var i = 0; i < nId.length; i++) {
                    if (value.id == nId[i].memberId) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    prev.push(value);
                }
            } else {
                prev = members
            }

            return prev;

        }, []);

        

        const bookedFilter = await removeBookedWithoutMember(matches, start_Date, end_Date)
        res.status(200).send(bookedFilter)

    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}
const removeBookedWithoutMember = async (matches, start_Date, end_Date) => {
    const bookedDates = await prisma.request_booking.findMany(
        {
            where: {
                r_start_Date: {
                    lte: start_Date,
                    lte: end_Date,
                },
                r_end_Date: {
                    gte: end_Date,
                    gte: start_Date
                },
                status: "Accepted"
            },
        })

   const mId = matches.map((m) => m)
   const bId = bookedDates.map((b) => b)

    let bookedMatches = mId.reduce(function (prev, value) {

        var isDuplicate = false;
        if (bId.length > 0) {
            for (var i = 0; i < bId.length; i++) {
                if (value.id == bId[i].hostId) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                prev.push(value);
            }
        } else {
            prev = matches
        }

        return prev;

    }, []);

    return bookedMatches

}

const getMembers = async (req, res, next) => {
    try {
        const members = await prisma.member.findMany({

            include: {
                non_availabile_date: true,
                request_booking: true
            }

        })
        res.status(200).send(members)


    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}
const memberDetails = async (req, res, next) => {
    const { id } = req.params
    try {
        const members = await prisma.member.findMany({
            where: {
                id: Number(id)
            },

            include: {
                non_availabile_date: true
            }

        })
        res.status(200).send(members)


    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}

const postMember = async (req, res, next) => {
    try {
        const member = await prisma.member.create({ data: req.body })
        res.status(200).send(member)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
    }
}
const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userChcek = await prisma.member.findUnique({
            where: {
                email: email,
            }
        })
        if (userChcek && userChcek.password === password) {
            res.status(200).send(userChcek)
        } else {
            res.status(400).send({ message: "invalid username and password" })
        }
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
    }
}
const signUp = async (req, res, next) => {
    // try {
        const { email } = req.body
        const userChcek = await prisma.member.findUnique({
            where: {
                email: email,
            }
        })
        if (userChcek) {
            res.status(400).send({ message: "user already exist" })
        } else {
            const member = await prisma.member.create({ data: req.body })


            if (member) {
                console.log(member.firstName)
                const data={
                    name:member.firstName,
                    email:member.email,
                    password:member.password,
                    subject:"Welcome to iHostYourPet.com"
                }
        
                const template=path.join(__dirname, '../emailNotifications/views/signup.ejs');
                await sendEmail(data,template)
                res.status(200).send(member)
            }
           
        }
    // } catch (error) {
    //     res.status(500).send({ message: "something went wrong" })
    // }
}

const updateProfile = async (req, res, next) => {
    try {
        const { id } = req.params
        const profileData = await prisma.member.update({
            where: { id: Number(id) },
            data: req.body,
        })
        const data={
            name:profileData.firstName,
            email:profileData.email,
            password:profileData.password,
            subject:"Change in password"
        }
        const template=path.join(__dirname, '../emailNotifications/views/ChangePassword.ejs');
        if(req.body.password){
            await sendEmail(data,template)
            res.status(200).send(profileData)
        }else{
            res.status(200).send(profileData)
        }
    } catch (error) {
        res.status(500).send({ message: "something went wrong", error })
    }
}

module.exports = {
    getMembers,
    postMember,
    getFilterMembers,
    getFilterWithOutMembers,
    memberDetails,
    updateProfile,
    getMember,
    signIn,
    signUp
}