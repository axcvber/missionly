import Logo from '@/components/logo'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <div className='fixed top-0 w-full px-4 py-2 border-b shadow-sm bg-white'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo />
        <div className='space-x-3 md:block md:w-auto flex items-center justify-between w-full'>
          <Button asChild size={'sm'} variant={'outline'}>
            <Link href={'/sign-in'}>Log In</Link>
          </Button>
          <Button asChild size={'sm'}>
            <Link href={'/sign-up'}>Get Missionly For Free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
