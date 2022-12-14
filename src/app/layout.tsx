import { ReactNode } from 'react'

import './globals.css'

const RootLayout = ({
  children,
}: {
  children: ReactNode
  }) => {
  return (
    <html lang="en" className="bg-white">
      <head />
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
