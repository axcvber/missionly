import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'
import QueryProvider from '@/components/providers/query-provider'
import ModalProvider from '@/components/providers/modal-provider'

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        {children}
        <Toaster />
        <ModalProvider />
      </QueryProvider>
    </ClerkProvider>
  )
}
