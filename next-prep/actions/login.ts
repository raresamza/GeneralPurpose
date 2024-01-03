//actions= user server
"use server"

import * as z from "zod"
import { LoginSchema } from "@/schemas"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    //axios.post goes here
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    } 
    return {success:"Email sent!"}
}
