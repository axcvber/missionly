import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'} className='hover:opacity-75 transition items-center gap-x-1 hidden md:flex'>
      <Image width={40} height={40} src={'/logo.png'} alt='Logo' />
      <span className='text-lg font-semibold font-heading text-neutral-600'>Missionly</span>
    </Link>
  )
}

export default Logo
