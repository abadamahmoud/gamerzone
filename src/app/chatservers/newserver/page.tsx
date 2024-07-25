import CreateServerForm from '@/components/CreateServerForm'
import React from 'react'

function page() {
  return (
    <div className='pt-14 w-full flex flex-col justify-center items-center  h-screen'>
      <h2>Create a new chat server</h2>
      <CreateServerForm/>
    </div>
  )
}

export default page