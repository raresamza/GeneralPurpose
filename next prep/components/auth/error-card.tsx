import { Header } from "./header"
import { BackButon } from "./back-button"
import {
  Card,
  CardFooter,
  CardHeader

} from "@/components/ui/card"
import { CardWrapper } from "./card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export const ErrorCard = () => {
  return (
    <CardWrapper headerLabel="Oops somethign went wrong!" backButtonHref="/auth/login" backButtonLabel="Back to login" >
      <div className="w-full flex items-center justify-center">
<ExclamationTriangleIcon className="text-destructive"/>
      </div>
      
    </CardWrapper>
  )
}

export default ErrorCard