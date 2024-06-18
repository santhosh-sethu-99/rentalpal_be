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
        throw error
    }
}

sendOtp = async (phoneNumber, otp) => {
    try {
        const otpData = await prisma.otp.findFirst({
            where: {
                phoneNumber: phoneNumber,
                isActive: true
            },
        })

        if (otpData) {
            throw new Error('OTP already sent!');
        }

        const result = await prisma.otp.create({
            data: {
                phoneNumber: phoneNumber,
                otp: otp.toString(),
                isActive: true,
                generatedAt: new Date()
            }
        })

        return result;
    } catch (error) {
        throw error
    }
}

fetchOtp = async (phoneNumber, otp) => {
    try {
        const result = await prisma.otp.findFirst({
            where: {
                phoneNumber: phoneNumber,
                otp: otp,
            },
        })

        return result;
    } catch (error) {
        throw error
    }
}

updateOtp = async (phoneNumber, otp) => {
    try {
        const data = await prisma.otp.findFirst({
            where: {
                phoneNumber: phoneNumber,
                otp: otp,
                isActive: true,
            }
        })

        const result = await prisma.otp.update({
            where: {
                id: data.id
            },
            data: {
                isActive: false
            }
        })

        return result;
    } catch (error) {
        throw error
    }
}

loginUser = async (phoneNumber) => {
    try {
        const data = await prisma.otp.findUnique({
            where: {
                phoneNumber: phoneNumber,
            }
        })

        const result = await prisma.users.update({
            where: {
                id: data.id
            },
            data: {
                lastLogin: new Date()
            }
        })

        return result;
    } catch (error) {
        throw error
    }
}

updateUser = async (username, phoneNumber) => {
    try {
        const data = await prisma.otp.findUnique({
            where: {
                phoneNumber: phoneNumber,
            }
        })

        const result = await prisma.users.update({
            where: {
                id: data.id
            },
            data: {
                username: username
            }
        })

        return result;
    } catch (error) {
        throw error
    }
}

module.exports = { createUser, sendOtp, fetchOtp, updateOtp, loginUser, updateUser }