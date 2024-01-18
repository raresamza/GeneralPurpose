"use client"

import Link from "next/link"
import { Button } from "../ui/button"

interface BackButonProps {
  label: string
  href: string
}

export const BackButon = ({ label, href }: BackButonProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size='sm' asChild>
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}