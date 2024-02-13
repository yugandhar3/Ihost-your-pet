const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const getPets = async (req, res, next) => {
    try {
        const pets = await prisma.pets.findMany()
        res.status(200).send(pets)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
        next(error)
    }
}

const postPets = async (req, res, next) => {
    try {
        const pet = await prisma.pets.create({ data: req.body })
        res.status(200).send(pet)
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
    }
}

module.exports = {
    getPets,
    postPets
}