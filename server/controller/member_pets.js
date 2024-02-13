const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const getMembersPets = async (req, res, next) => {
    const { memberId } = req.body
   
    try {
        const membersPets = await prisma.member_pets.findMany({ 
            where: {
                memberId: memberId
            }
        })
        
        res.status(200).send(membersPets)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}

const postMemberPets = async (req, res, next) => {
    console.log(req.body)
    try {
        console.log(req.body)
        const memberPet = await prisma.member_pets.create({ data: req.body })
        res.status(201).send(memberPet)
    } catch (error) {
        res.status(500).send({ message: "something went wrong", error })
    }
}

const updatePets = async (req, res, next) => {
    try {
        const { id } = req.params
        const petData = await prisma.member_pets.update({
            where: {id: Number(id) },
            data:req.body,
        })
        console.log("data",petData)
        res.status(200).send(petData)
    } catch (error) {
        res.status(500).send({ message: "something went wrong",error })
    }
}
const deletePets = async (req, res, next) => {
    try {
        const { id } = req.params
        const petData = await prisma.member_pets.delete({
            where: { id: Number(id) }
        })
        console.log("data", petData)
        res.status(200).send(petData)
    } catch (error) {
        res.status(500).send({ message: "something went wrong", error })
    }
}
module.exports = {
    getMembersPets,
    postMemberPets,
    updatePets,
    deletePets
}