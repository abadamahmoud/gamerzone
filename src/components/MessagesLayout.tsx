"use client"
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

function MessagesLayout() {
     const pathname = usePathname();

     const channels = ["general", "random", "squad1", "squad2", "squad3", ]
     const servers = [
         {name:"homies", image:"https://images.pexels.com/photos/19545795/pexels-photo-19545795/free-photo-of-nature-parc-photographie-animaliere-paon.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load", id:"rgaagrareg"},
         {name:"class", image:"https://images.pexels.com/photos/19545795/pexels-photo-19545795/free-photo-of-nature-parc-photographie-animaliere-paon.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load", id:"rgaagrareg"},
         {name:"duzc", image:"https://images.pexels.com/photos/19545795/pexels-photo-19545795/free-photo-of-nature-parc-photographie-animaliere-paon.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load", id:"rgaagrareg"},
         {name:"my server", image:"https://images.pexels.com/photos/19545795/pexels-photo-19545795/free-photo-of-nature-parc-photographie-animaliere-paon.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",  id:"rgaagrareg"},
     ]
    
 const [] = useState<string>('servers'); // Define state here
  return (
     <div className='flex pt-16 px-2 flex-col items-start gap-2   w-1/4 min-w-72 lg:w-1/4 h-full'>
          <Link href="/chatservers/newserver" className='w-full'>
          <Button variant={'outline'} className='w-full h-12 mt-1 text-lg'>
               <Plus className='mr-1'/> New Chat Server
          </Button>
          </Link>
            
       
           
           <Select >
               <SelectTrigger className="w-full text-lg   hover:dark:bg-neutral-800 hover:bg-neutral-100 h-12">
                   <SelectValue placeholder={<div className='flex gap-2 items-center'>

                 <img src={servers[0].image} alt={servers[0].name} className='w-10 h-10 object-cover rounded-full' />
                 <span className=''>{servers[0].name}</span>
                 </div>} />   
               </SelectTrigger>
               <SelectContent>
                   {servers.map(server => 
                   <SelectItem key={server.name} value={server.name}>
                       <div className='flex gap-2 text-lg items-center'>

                       <img src={server.image} alt={server.name} className='w-10 h-10 object-cover rounded-full' />
                       <span className=''>{server.name}</span>
                       </div>
                   </SelectItem>
                   )}
                   
               </SelectContent>
           </Select>
           <div className='border flex flex-col h-full w-full mb-4 rounded-sm'>

           
          
           <span className='w-full pl-8 mt-8 text-xl underline text-purple-400'>Channels </span>

           {channels.map(channel => 
               <Link href={`/chatservers/${"ruihgo"}/${channel}`} className='w-full pl-6 text-start text-2xl hover:dark:bg-neutral-800 hover:bg-neutral-100' >
                   #  { channel}
               </Link>
           )}
           </div>
 </div>
    
  )
}

export default MessagesLayout