'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import IndexPage from '@/components/IndexPage'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/v1')
    router.refresh()
  }, [router])

  return null;
}

export default Home
