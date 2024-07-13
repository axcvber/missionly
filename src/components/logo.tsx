import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'} className='hover:opacity-75 transition-opacity block'>
      <Image priority width={200} height={60} alt='Logo' src='/logo.png' quality={100} />
    </Link>
  )
}

export default Logo
