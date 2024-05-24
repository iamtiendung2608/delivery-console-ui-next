import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Image from 'next/image'

import { Metadata } from 'next'
import SettingsComponent from '@/components/Setting/SettingsComponent'
import { useRouter } from 'next/navigation'
import { actionGetOrganizationDetail, actionGetUser } from '@/app/settings/action'
export const metadata: Metadata = {
  title: 'Settings Page | Next.js E-commerce Dashboard Template',
  description: 'This is Settings page for TailAdmin Next.js'
  // other metadata
}

const Settings = async () => {
  const user = await actionGetUser();
  const organization = await actionGetOrganizationDetail(user.organizationId);

  return (
    <>
      <SettingsComponent user={user} organization={organization} />
    </>
  )
}

export default Settings
