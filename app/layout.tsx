import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'
import Navbar from './MyComponents/navbar'
import { Toaster } from '@/components/ui/toaster'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar/>
          {children}
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  )
}