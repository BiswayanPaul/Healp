'use client'

import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import ModeToggle from './Dark-Mode-Toggle-Button'
import { useAuth, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ROUTES } from "@/constants/routePath"
import Link from 'next/link'
import clsx from 'clsx'

const navLinks = [
    { label: 'Find Hospitals', path: ROUTES.PAGE.FIND_HOSPITALS },
    { label: 'Medical Services', path: ROUTES.PAGE.SERVICES },
    { label: 'Health Packages', path: ROUTES.PAGE.FIND_PACKAGES },
    { label: 'About Us', path: ROUTES.PAGE.ABOUT },
    { label: 'Contacts', path: ROUTES.PAGE.CONTACT },
]

const Navbar = () => {
    const { isSignedIn } = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <nav className={clsx(
                'z-50 max-w-7xl mx-auto transition-all duration-300 px-8 rounded-full flex items-center justify-between',
                'border dark:border-gray-700 shadow-lg backdrop-blur-md',
                'bg-white/90 dark:bg-gray-900/80',
                isScrolled
                    ? 'fixed py-2 translate-1/4' // Scrolled look
                    : 'relative mt-4 py-5 shadow-md'
            )}>

                <div className='block md:hidden'>
                    <Button variant='ghost' onClick={() => setSidebarOpen(true)}>
                        ☰
                    </Button>
                </div>

                <Link
                    href="/"
                    className={clsx(
                        "font-bold transition-all duration-300 tracking-tight",
                        isScrolled
                            ? "text-xl mr-4 text-blue-900 dark:text-blue-300"
                            : "text-2xl text-blue-900 dark:text-blue-300"
                    )}
                >
                    HEALP
                </Link>

                <div className="hidden md:flex items-center gap-x-8">
                    {navLinks.map(({ label, path }) => (
                        <Link href={path} key={path}>
                            <span className={clsx(
                                'transition-all font-medium duration-300 px-4 py-1 rounded-full',
                                isScrolled ? 'text-sm' : 'text-base',
                                'text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200'
                            )}>
                                {label}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className='flex items-center gap-3'>
                    <Button className='text-blue-800 dark:text-white font-semibold' variant='ghost'>
                        {isSignedIn ? <UserButton /> : <div onClick={() => router.push("/auth/signin")}>Login</div>}
                    </Button>
                    <ModeToggle />
                </div>
            </nav>

            {sidebarOpen && (
                <div
                    className='fixed inset-0 bg-black/50 z-40'
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className={clsx(
                'fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-white dark:bg-gray-800 z-50 transition-transform duration-300 ease-in-out shadow-2xl',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            )}>
                <div className='flex items-center justify-between px-4 py-3 border-b dark:border-gray-600'>
                    <h2 className='text-lg font-bold text-blue-800 dark:text-white'>HEALP</h2>
                    <Button variant="ghost" onClick={() => setSidebarOpen(false)}>
                        <X className='text-blue-800 dark:text-white' />
                    </Button>
                </div>
                <ul className='flex flex-col gap-4 p-4'>
                    {navLinks.map(({ label, path }) => (
                        <Link href={path} key={path} onClick={() => setSidebarOpen(false)}>
                            <li className='text-gray-800 dark:text-white hover:text-blue-700 dark:hover:text-blue-300 transition'>
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