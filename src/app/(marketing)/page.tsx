import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { Goal, Medal } from 'lucide-react'
import Link from 'next/link'

const MarketingPage = () => {
  return (
    <div className='w-full py-8 flex flex-col items-center justify-center text-center'>
      <div className='flex items-center justify-center flex-col'>
        <span className='mb-10 flex items-center py-3 px-4 bg-primary/10 text-primary rounded-full uppercase text-sm font-medium'>
          <Medal className='h-5 w-5 mr-2' />
          No 1 task management
        </span>
        <h1 className='text-center text-neutral-800 mb-6'>{siteConfig.name} helps team move</h1>
        <p className='h1 !font-medium bg-gradient-to-t from-primary via-primary/80 to-primary/30 text-white px-4 p-2 rounded-md pb-4'>
          works forward.
        </p>
      </div>
      <p className='text-neutral-400 mt-6 max-w-sm md:max-w-xl text-sm md:text-base'>
        Collaborate, manage projects, and reach new productivity peaks. From hight to the home office, the way your team
        works os unique - accomplish it all with {siteConfig.name}.
      </p>
      <Button asChild className='mt-6'>
        <Link href={'/sign-up'}>
          <Goal />
          Get {siteConfig.name} For Free
        </Link>
      </Button>
    </div>
  )
}

export default MarketingPage
