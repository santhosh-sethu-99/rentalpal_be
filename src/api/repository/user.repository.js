const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

fetchUser = async (phoneNumber) => {
    try {
        const data = await prisma.users.findUnique({
            where: {
                phoneNumber: phoneNumber
            }
        })

        return data;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = { fetchUser }