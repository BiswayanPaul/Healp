'use client'

import AuthForm from '@/components/Auth-Form'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const { isSignedIn } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isSignedIn) {
            console.log("Signed In")
            router.push("/v1")
        }
    }, [isSignedIn, router])
    return (
        <div>
            <AuthForm type='signin' />
        </div>
    )
}

export default page