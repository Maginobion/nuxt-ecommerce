import nodemailer from 'nodemailer'
import User from '~~/server/db/models/user'
import crypto from 'crypto'

const config = useRuntimeConfig()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: config.gmailClient,
    pass: config.gmailSecret
  }
})

export default defineEventHandler(async (event) => {

    const { email } = await readBody(event) // Pass params via JSON in the POST request

    const user = await User.findOne({email: email})

    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailRegex.test(email.trim())){
        return { 
            status: false,
            msg: 'Ingrese un correo válido.' 
        }
    }

    if(!user){
        return {
            status: true,
        }
    }

    user.recoveryKey = crypto.randomBytes(20).toString('hex');

    user.save()

    const url = process.env.NODE_ENV === 'production' ? 'https://nuxt-ecommerce-psi.vercel.app/auth/reset?code=' : 'http://localhost:3000/auth/reset?code='

    const result = await transporter.sendMail({
        from: '1913010909@untels.edu.pe',
        to: email,
        subject: 'Recuperación de contraseña',
        text: `
            Haz click en el siguiente enlace para recuperar tu contraseña:
            ${url}${user.recoveryKey}
        `
    })

    return {
        status: true,
    }
})