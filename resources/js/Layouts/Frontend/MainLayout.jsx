import React from 'react'
import NavBar from './Partials/Navbar'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="p-4">{children}</main>
    </div>
  )
}
