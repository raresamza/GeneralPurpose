import { Resend } from "resend";

const resend= new Resend(process.env.RESEND_API_KEY)


export const sendVerificationPasswordResetEmail = async (email:string, token:string) => {
    const resetLink=`http://localhost:3000/auth/new-password?token=${token}`


    await resend.emails.send( {
        from:"oboarding@resend.dev",
        to:email,
        subject:"Confirm you password reset request",
        html:`<p>Click <a href="${resetLink}">here</a> to reset your password </p>`
    })
}


export const sendVerificationEmail = async (email:string, token:string) => {
    const confirmLink=`http://localhost:3000/auth/new-verification?token=${token}`


    await resend.emails.send( {
        from:"oboarding@resend.dev",
        to:email,
        subject:"Confirm you email",
        html:`<p>Click <a href="${confirmLink}">here</a> to confirm your email </p>`
    })
}