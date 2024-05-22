import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Image from 'next/image'

import { Metadata } from 'next'
import SettingsComponent from '@/components/Setting/SettingsComponent'
export const metadata: Metadata = {
  title: 'Settings Page | Next.js E-commerce Dashboard Template',
  description: 'This is Settings page for TailAdmin Next.js'
  // other metadata
}

const Settings = () => {
  return (
    <>
      <SettingsComponent />
    </>
  )
}

export default Settings
