import Logo from '@/components/logo'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <header className='w-full py-1 border-b bg-white'>
      <div className='flex items-center w-full justify-between container'>
        <Logo />
        <div className='gap-x-3 flex items-center'>
          <Button asChild size={'sm'} variant={'outline'}>
            <Link href={'/sign-in'}>Log In</Link>
          </Button>
          <Button asChild size={'sm'}>
            <Link href={'/sign-up'}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
