import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function MyPage() {
    const Map = useMemo(() => dynamic(
        () => import('@/components/Maps/map'),
        { 
          loading: () => <h1>A map is loading</h1>,
          ssr: false
        }
      ), [])

    return (
        <>
          <Map />
        </>
      )
  }

