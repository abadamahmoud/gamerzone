import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/ui/radio-group"
import { Button } from './ui/button'
import Link from 'next/link'
  

function Channels() {
    const channels = ["general", "random", "squad1", "squad2", "squad3", ]
    const servers = [
        {name:"homies", image:"https://images.pexels.com/photos/19545795/pexels-photo-19545795/free-photo-of-nature-parc-photographie-animaliere-paon.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"},
        {name:"class", image:"https://images.pexels.com/photos/19545795/pexels-photo-19545795/free-photo-of-nature-parc-photographie-animaliere-paon.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"},
        {name:"duzc", image:"https://images.pexels.com/photos/19545795/pexels-photo-19545795/free-photo-of-nature-parc-photographie-animaliere-paon.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"},
        {name:"my server", image:"https://images.pexels.com/photos/19545795/pexels-photo-19545795/free-photo-of-nature-parc-photographie-animaliere-paon.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"},
    ]
   
const [selectedOption, setSelectedOption] = useState<string>('servers'); // Define state here
const handleOptionChange = (value: string) => {
    setSelectedOption(value); // Update state here
  };



  return (
    <div className='flex flex-col items-start gap-2   w-1/4 lg:w-1/6 border-r h-full'>
        <RadioGroup 
        name="example" 
        value={selectedOption} 
        onValueChange={handleOptionChange} // Use the handler here
        className='flex gap-2 justify-between items-center w-full p-2'
      >
        <RadioGroupItem value="servers" className={`${selectedOption === 'servers' ? "dark:bg-neutral-800 bg-neutral-100" : ""} w-1/2`}>
          <Link href={"/messages/servers"}>
            Servers
          </Link>
          </RadioGroupItem>
          <RadioGroupItem value="dms" className={`${selectedOption === 'dms' ? "dark:bg-neutral-800 bg-neutral-100" : ""} w-1/2`}>
          <Link href={"/messages/dms"}>
            DMs
          </Link>
          </RadioGroupItem>
      </RadioGroup>
        
        <Select >
            <SelectTrigger className="w-full text-lg border-none hover:dark:bg-neutral-800 hover:bg-neutral-100 h-12">
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

        {channels.map(channel => 
            <button className='w-full pl-6 text-start text-2xl hover:dark:bg-neutral-800 hover:bg-neutral-100' >
                #  { channel}
            </button>
        )}
    </div>
  )
}

export default Channels


/*
fetch channels in an aray for each server when it is up
for each channel we return a component that has its name 
when a channel is selected we return its discussion on the right srea
this should be a scroll area
*/