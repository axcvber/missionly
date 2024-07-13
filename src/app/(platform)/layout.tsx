import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'
import QueryProvider from '@/components/providers/query-provider'
import ModalProvider from '@/components/providers/modal-provider'
import NextTopLoader from 'nextjs-toploader'

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90 !shadow-none',
        },
      }}
    >
      <QueryProvider>
        <NextTopLoader color='#106465' showSpinner={false} />
        {children}
        <Toaster />
        <ModalProvider />
      </QueryProvider>
    </ClerkProvider>
  )
}
