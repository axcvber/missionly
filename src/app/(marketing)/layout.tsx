import Navbar from './_components/navbar'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-full bg-slate-50 flex flex-col'>
      <Navbar />
      <main className='flex flex-1 container'>{children}</main>
    </div>
  )
}
