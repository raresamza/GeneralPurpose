"use server"

import { db } from "@/lib/db"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { SettingsSchema } from "@/schemas"
import { getUserByEmail, getUserByID } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { newPassword } from "./new-passowrd"


export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser()

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserByID(user.id)
    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    if (user.isOAuth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled = undefined
    }

    if (values.email && values.email != user.email) {
        const existingUser = await getUserByEmail(values.email)
        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use!" }
        }

        const verificationToken=await generateVerificationToken(values.email)

        await sendVerificationEmail(verificationToken.email,verificationToken.token)

        return {succes:"Verification email sent"}
    }

    if (values.password && values.newPassword && dbUser.password) {
     
        const passwordsMatch= await bcrypt.compare(values.password,dbUser.password)
        if(!passwordsMatch) {
            return{error:"Incorrect password!"}
        }

        const hashedPassword=await bcrypt.hash(values.newPassword,10)

        values.password = hashedPassword
        values.newPassword=undefined
     }

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values
        }
    })

    return { success: "Settings updated" }
}