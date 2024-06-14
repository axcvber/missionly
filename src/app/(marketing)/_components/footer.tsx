import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'

const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full px-4 py-2 border-t bg-slate-100'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo />
        <div className='md:block md:w-auto flex items-center justify-between w-full'>
          <Button size={'sm'} variant={'link'}>
            Privacy Policy
          </Button>
          <Button size={'sm'} variant={'link'}>
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Footer
