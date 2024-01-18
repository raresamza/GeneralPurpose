"use client"

import { Card, CardHeader, CardFooter, CardContent } from "../ui/card"
import { BackButon } from "./back-button"
import { Header } from "./header"
import { Social } from "./social"


interface CardWrapperProps {
	children: React.ReactNode
	headerLabel: string
	backButtonLabel: string
	backButtonHref: string
	showSocial?: boolean
}

export const CardWrapper = ({ children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial }
	: CardWrapperProps) => {
	return (
		<Card className="w-[400px] shadow-md">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
			{showSocial && (
				<CardFooter>
					<Social>
					</Social>
				</CardFooter>
				
			)}
			<CardFooter>
					<BackButon label={backButtonLabel} href={backButtonHref}></BackButon>
				</CardFooter>
		</Card>
	)
}