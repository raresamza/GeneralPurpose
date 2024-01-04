//actions= user server
"use server"

import bcrypt from "bcryptjs"
import {db} from "@/lib/db"
import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    //axios.post goes here
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    } 

    const {name,email,password} =validatedFields.data
    const hashedPassword= await bcrypt.hash(password,10)

    const existingUser=await getUserByEmail(email)

    if (existingUser) {
        return {error:"Email already in use"}
    }

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    })

    //TODO send verification token email

    return {success:"User created!"}
}