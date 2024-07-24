"use client"
import React from 'react'
import PropTypes from 'prop-types'
import MessagesLayout from '@/components/MessagesLayout'

function Layout({ children }: { children: React.ReactNode }) {
 



  return (
    <div className='flex h-screen w-ful '>
    <MessagesLayout/>
     
    {children}
  </div>)
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
