import clsx from 'clsx'
import { type SVGProps } from 'react'

export function XIcon(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props

  return (
    <svg className={clsx('w-4 h-4', className)} {...rest} viewBox='0 0 1200 1227' fill='currentColor'>
      <title>x</title>
      <path d='m714.163 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.2396h162.604l304.797 435.9906 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z' />
    </svg>
  )
}
