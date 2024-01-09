"use server"
import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import * as z from "zod"
import { sendVerificationPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"
import { getPasswordResetTokenByEmail, getPasswordResetTokenByToken } from "@/data/password-reset-token"


export const reset = async (values: z.infer<typeof ResetSchema>) => {


    const validatedValues = ResetSchema.safeParse(values)

    if (!validatedValues.success) {
        return { error: "Invalid email" }
    }

    const { email } = validatedValues.data

    const existingUser = await getUserByEmail(email)
    if (!existingUser) {

        return { error: "Email not found!" }
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendVerificationPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )
    return { success: "Reset email sent!" }
}