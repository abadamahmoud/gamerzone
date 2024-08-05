"use client"
import React from 'react'
import PropTypes from 'prop-types'
import MessagesLayout from '@/components/MessagesLayout'
import Dms from '@/components/Dms'

function Layout({ children }: { children: React.ReactNode }) {
 



  return (
    <div className='flex h-screen w-full pt-16 md:flex-row flex-col '>
    <Dms/>
     
    {children}
  </div>)
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
