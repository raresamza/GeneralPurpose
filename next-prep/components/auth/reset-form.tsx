"use client"

//hook=use client
//page interaction=use client

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { ResetSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Form, FormControl, FormItem, FormMessage, FormLabel, FormField } from "../ui/form"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { reset } from "@/actions/reset"
import { useState, useTransition } from "react"

export const ResetForm = () => {


	const [isPending, setIsPending] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof ResetSchema>>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: "",
		}
	})


	const onSubmit = (values: z.infer<typeof ResetSchema>) => {

		setError("")
		setSuccess("")

		setIsPending(() => {
			reset(values).then((data) => {
				setError(data?.error)
				setSuccess(data?.success)
			})
		})
	}

	return (

		<CardWrapper
			headerLabel="Forgot your passowrd"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
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
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit" className="w-full" disabled={isPending}>
						Send Reset email
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

