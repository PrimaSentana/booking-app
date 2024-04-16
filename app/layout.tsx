import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/navbar/Navbar'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import SearchModal from './components/modals/SearchModal'

// font changer

const inter = Inter({ subsets: ['latin'] })

//----

// <head> tag in HTML
export const metadata: Metadata = {
  title: 'Roamradar',
  description: 'UKK Project',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <SearchModal/>
        <RentModal />
        <LoginModal />
        <RegisterModal/>
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
