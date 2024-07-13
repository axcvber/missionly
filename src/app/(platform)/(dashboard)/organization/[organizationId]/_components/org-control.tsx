'use client'

import { useOrganizationStore } from '@/hooks/use-organization-store'
import { useOrganizationList } from '@clerk/nextjs'
import { useEffect } from 'react'

const OrgControl: React.FC<{ orgId: string }> = ({ orgId }) => {
  const { setActive } = useOrganizationList()
  const { setIsSwitching } = useOrganizationStore()

  const changeOrg = async () => {
    if (!setActive) return
    setIsSwitching(true)
    try {
      await setActive({
        organization: orgId,
      })
    } catch (error) {
      console.error('Error switching organization:', error)
    } finally {
      setIsSwitching(false)
    }
  }

  useEffect(() => {
    changeOrg()
  }, [orgId])

  return null
}

export default OrgControl
