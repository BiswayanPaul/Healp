'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import ModeToggle from './Dark-Mode-Toggle-Button'
import { useAuth, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ROUTES } from "@/constants/routePath"
import Link from 'next/link'

const navLinks = [
    { label: 'Find Hospitals', path: ROUTES.PAGE.FIND_HOSPITALS },
    { label: 'Medical Services', path: ROUTES.PAGE.SERVICES },
    { label: 'Health Packages', path: ROUTES.PAGE.FIND_PACKAGES },
    { label: 'About Us', path: ROUTES.PAGE.ABOUT },
    { label: 'Contacts', path: ROUTES.PAGE.CONTACT },
]


// Prevent hydration errors with dynamic import

const Navbar = () => {

    const { isSignedIn } = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter()

    return (
        <>
            <nav className='m-2 p-4 border-2 border-blue-950 flex items-center justify-between bg-[#0D5EA6] rounded-full relative'>

                {/* Left side: Hamburger + Logo */}
                <div className='flex items-center gap-4'>
                    <div className='block md:hidden'>
                        <Button
                            variant='ghost'
                            className='text-white text-2xl font-bold'
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </Button>
                    </div>
                    <Link href="/" className='font-extrabold text-2xl text-white hover:text-blue-300 hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out'>
                        HEALP
                    </Link>

                </div>

                {/* Center nav links */}
                <div className='hidden md:flex items-center gap-6'>
                    {navLinks.map(({ label, path }) => (
                        <Link href={path} key={path}>
                            <li className='list-none text-white hover:text-[#98A1BC] hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:underline'>
                                {label}
                            </li>
                        </Link>
                    ))}
                </div>



                {/* Right side: Login + Toggle */}
                <div className='flex items-center gap-2'>
                    <Button className='text-white font-extrabold hover:cursor-pointer' variant='ghost'>
                        {isSignedIn ? <div><UserButton /></div> : <div onClick={() => router.push("/auth/signin")}>Login</div>}
                    </Button>
                    <ModeToggle />

                </div>
            </nav>

            {/* Sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 z-40'
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className='flex items-center justify-between p-4 border-b'>
                    <h2 className='text-xl font-bold text-blue-800 dark:text-white'>HEALP</h2>
                    <Button variant="ghost" onClick={() => setSidebarOpen(false)}>
                        <X className='text-blue-800 dark:text-white' />
                    </Button>
                </div>

                <ul className='flex flex-col gap-4 p-4 text-lg'>
                    {navLinks.map(({ label, path }) => (
                        <Link href={path} key={path} onClick={() => setSidebarOpen(false)}>
                            <li className='hover:text-blue-700 hover:dark:text-blue-300 hover:cursor-pointer transition-all duration-200'>
                                {label}
                            </li>
                        </Link>
                    ))}
                </ul>


            </div>
        </>
    )
}

export default Navbar
