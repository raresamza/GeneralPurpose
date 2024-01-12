"use client"

//hook=use client
//page interaction=use client

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import * as z from "zod"

import { LoginSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Form, FormControl, FormItem, FormMessage, FormLabel, FormField } from "../ui/form"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import { startTransition, useState, useTransition } from "react"
import Link from "next/link"

export const LoginForm = () => {


  const [isPending, setIsPending] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : ""

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })


  const onSubmit = (values: z.infer<typeof LoginSchema>) => {

    setError("")
    setSuccess("")

    setIsPending(() => {
      login(values).then((data) => {
        // setError(data?.error)
        // setSuccess(data?.success)

        if (data?.error) {
          form.reset
          setError(data.error)
        }
        if (data?.success) {
          form.reset
          setError(data.success)
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true)
        }
      }).catch(() => setError("Something went wrong"))
    })
  }

  return (

    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Dont have an account?"
      backButtonHref="/auth/register"
      showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField control={form.control} name="code" render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Code</FormLabel>
                  <FormControl>
                    <Input {...field}
                      disabled={isPending}
                      placeholder="111111"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            )}
            {!showTwoFactor && (
              <>
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field}
                        disabled={isPending}
                        placeholder="johndoe@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field}
                        placeholder="******"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <Button size="sm" variant="link" asChild className="px-0 font-normal">
                      <Link href="/auth/reset">Forgot Password?</Link>

                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? "Confirm": "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

