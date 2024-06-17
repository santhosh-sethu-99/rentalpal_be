const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

createUser = async (username, phoneNumber) => {
    try {
        const result = await prisma.users.create({
            data: {
                username: username,
                phoneNumber: phoneNumber
            }
        })



        return result;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = { createUser }