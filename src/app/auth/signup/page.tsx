'use client'

import AuthForm from '@/components/Auth-Form'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
    const { isSignedIn } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isSignedIn) {
            router.push("/v1")
        }
    }, [isSignedIn, router])

    return (
        <div>
            <AuthForm type='signup' />
        </div>
    )
}

export default Page