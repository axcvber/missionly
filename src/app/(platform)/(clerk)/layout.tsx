import Image from 'next/image'

export default function ClerkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-full flex items-center justify-center relative'>
      <Image priority fill src={'/auth.jpg'} alt='Background' className='object-cover' quality={100} />
      {children}
    </div>
  )
}
