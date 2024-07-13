import React from 'react'
import Sidebar from '../../_components/sidebar'
import OrgControl from './_components/org-control'
import { auth } from '@clerk/nextjs/server'
import { startCase } from 'lodash'
import { checkSubscription } from '@/lib/subscription'

export async function generateMetadata() {
  const { orgSlug } = auth()
  return {
    title: startCase(orgSlug || 'Organization'),
  }
}

export default async function OrganizationLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { organizationId: string }
}) {
  const isPro = await checkSubscription()

  return (
    <main className='w-full py-6 px-4'>
      <div className='flex gap-x-7'>
        <div className='w-64 shrink-0 hidden md:block'>
          <Sidebar isPro={isPro} />
        </div>
        <div className='w-full'>{children}</div>
        <OrgControl orgId={params.organizationId} />
      </div>
    </main>
  )
}
