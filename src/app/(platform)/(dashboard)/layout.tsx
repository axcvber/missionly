import React from 'react'
import Navbar from './_components/navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full flex flex-col h-full'>
      <Navbar />
      <main className='flex-1 w-full'>{children}</main>
    </div>
  )
}
