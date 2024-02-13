const { PrismaClient } = require("@prisma/client")
const cloudinaryModule = require("cloudinary");

const prisma = new PrismaClient()



const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: 'dbvuwxdtq',
  api_key: '479115946436551',
  api_secret: "ygXeKz9tB-2SZYZnFTpRGc87nvc",
});

const getHosts = async (req, res, next) => {
    const {image} = req.body
    try {
        if (image) {
            console.log("image inside")
            const uploadedResponse = await cloudinary.uploader.upload(image, {
              upload_preset: "profile",
            });
            console.log("image outside",uploadedResponse)
            res.send({uploadedResponse})
        }
       
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}


const getHost = async (req, res, next) => {
    try {
        const hosts = await prisma.hosts.findMany({
           include:{
            host:{
                include:{
                    event_schedule:true
                }
            },
            request_booking:true
           }
        })
        res.status(200).send(hosts)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}
const postHost = async (req, res, next) => {
    try {
        const host = await prisma.hosts.create({ data: req.body })
        res.status(200).send(host)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
    }
}

module.exports = {
    getHosts,
    postHost,
    getHost
}