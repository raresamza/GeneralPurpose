import {db} from "@/lib/db"

export const getVerificationToklenByToken=async (token:string) => {
    try {
        const verificationToken=await db.verificationToken.findUnique({
            where:{token}
        })
        return verificationToken
    } catch  {
        return null
    }
}


export const getVerificationToklenByEmail=async (email:string) => {
    try {
        const verificationToken=await db.verificationToken.findFirst({
            where:{email}
        })
        return verificationToken
    } catch  {
        return null
    }
}