"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface AuthButtonsProps {
  user: any
  logout: () => void
}

export function AuthButtons({ user, logout }: AuthButtonsProps) {
  const router = useRouter()

  return user ? (
    <Button onClick={logout} className="px-6 py-2 bg-red-500 text-white hover:bg-red-600">
        Logout
    </Button>
    ) : (
    <Button onClick={() => router.push("/login")} className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700">
        Login
    </Button>
)}
