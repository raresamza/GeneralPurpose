"use client"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { BeatLoader, ClimbingBoxLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verfication"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

const NewVerificationPage = () => {

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams();

  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {

    if (success || error) {
      return
    }

    if (!token) {
      setError("Missing token!")
      return
    }
    newVerification(token).then((data) => {
      setSuccess(data.success)
      setError(data.error)
    })
      .catch(() => {
        setError("Something went wrong!")
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper headerLabel="Confirm your email!" backButtonHref="/auth/login" backButtonLabel="Back to login">
      <div className="flex items-center justify-center w-full">
        {!success && !error && (
          <ClimbingBoxLoader />)}
        <FormSuccess message={success}></FormSuccess>
        {!success && (
        <FormError message={error}></FormError>
        )}
      </div>

    </CardWrapper>
  )
}

export default NewVerificationPage