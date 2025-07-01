'use client'

import React, { useEffect, useState } from 'react'

const RenderMounted = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true))

    if (!mounted) return null;
    return (
        <>{children}</>
    )
}

export default RenderMounted