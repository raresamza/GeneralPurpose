import { UserRole } from "@prisma/client"
import * as z from "zod"

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6))

}).refine((data) => {
  if (data.password && !data.newPassword) {
    return false
  }
  if (!data.password && data.newPassword) {
    return false
  }

  return true
}, {
  message: "New passowrd is required",
  path: ["newPassword"]
}).refine((data) => {
  if (!data.password && data.newPassword) {
    return false
  }

  return true
}, {
  message: "Old passowrd is required",
  path: ["password"]
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password must contain at least 1 character"
  }),
  code: z.optional(z.string())
})

export const ResetSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required"
  }),

})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password needs to be at least 6 characters long"
  }),

})

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password needs to be at least 6 characters long"
  })
})