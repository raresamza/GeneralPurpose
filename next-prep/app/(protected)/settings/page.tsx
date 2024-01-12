"use client"

import { logout } from "@/actions/logout"
import { useCurrentUser } from "@/hooks/use-currrent-user"

const SettignsPage = () => {
  const user = useCurrentUser()
  const onClick = () => {
    logout()
  }


  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClick}>
        Sign Out
      </button>
    </div>
  )
}

export default SettignsPage