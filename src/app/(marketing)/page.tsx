import { Button } from '@/components/ui/button'
import { Medal } from 'lucide-react'
import Link from 'next/link'

const MarketingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center flex-col'>
        <div className='mb-4 flex items-center border p-4 bg-yellow-100 text-yellow-700 rounded-full uppercase'>
          <Medal className='h-6 w-6 mr-2' />
          No 1 task management
        </div>
        <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>Missionly helps team move</h1>
        <div className='text-3xl md:text-6xl bg-gradient-to-t from-purple-500 to-blue-400 text-white px-4 p-2 rounded-md pb-4'>
          works forward.
        </div>
      </div>
      <div className='text-sm md:text-lg text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto'>
        Collaborate, manage projects, and reach new productivity peaks. From hight to the home office, the way your team
        works os unique - accomplish it all with Missionly.
      </div>
      <Button asChild size={'lg'} className='mt-6'>
        <Link href={'/sign-up'}>Get Missionly For Free</Link>
      </Button>
    </div>
  )
}

export default MarketingPage
