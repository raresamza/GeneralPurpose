"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { settings } from "@/actions/settings"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { useTransition } from "react"
import { SettingsSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormDescription, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useCurrentUser } from "@/hooks/use-currrent-user"
import { FormSuccess } from "@/components/form-success"
import { FormError } from "@/components/form-error"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserRole } from "@prisma/client"
import { Switch } from "@/components/ui/switch"

const SettignsPage = () => {

  const user = useCurrentUser()

  const { update } = useSession()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, setIsPending] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
    }
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setIsPending(() => {
      settings(values).then((data) => {
        if (data.error) {
          setError(data.error)
        }
        if (data.success) {
          update()
          setSuccess(data.success)
        }
      }).catch(() => setError("Something went wrong!"))
    })
  }


  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Settings
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {user?.isOAuth === false && (
                <>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="johndoe@gmail.com" disabled={isPending} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="******" disabled={isPending} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="newPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        New Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="******" disabled={isPending} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </>
              )}
              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Role
                  </FormLabel>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>
                        Admin
                      </SelectItem>
                      <SelectItem value={UserRole.USER}>
                        User
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              {user?.isOAuth === false && (
              <FormField control={form.control} name="isTwoFactorEnabled" render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center rounded-lg shadow-sm border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Two Factor Authentication</FormLabel>
                    <FormDescription> Enable two factor authenticationt for your account</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )} />
              )}
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettignsPage