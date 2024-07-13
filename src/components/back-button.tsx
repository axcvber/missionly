'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {
  const router = useRouter()

  return (
    <Button variant={'transparent'} size={'sm'} onClick={() => router.back()}>
      <ArrowLeft />
      Back
    </Button>
  )
}

export default BackButton
