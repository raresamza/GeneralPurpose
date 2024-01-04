import * as z from "zod"

export const LoginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(1,{
        message:"Password must contain at least 1 character"
    })
})

export const RegisterSchema=z.object({
    name:z.string().min(1,{
        message:"Name is required"
    }),
    email:z.string().email(),
    password:z.string().min(6,{
        message:"Password needs to be at least 6 characters long"
    })
})