import React, { useState } from 'react'
import { BiArchiveIn } from 'react-icons/bi'
import { BiImport } from 'react-icons/bi'

const tags = () => {

  const [activeTag, setActiveTag] = useState(true);

  const handleClick = () => {
    setActiveTag(!activeTag);
  }

  return (
    <div className="flex flex-col items-start h-screen w-full mt-2 text-white">
      <h1 className='text-xl mb-10 font-bold pl-5'>TAGS</h1>
      <div className='flex text-md justify-between h-full w-full flex-col items-center'>
        <div className='flex flex-col'>
          <button onClick={handleClick} className={"m-1 px-8 py-1 " + (activeTag ? "bg-hovertagColor" : "")}>#all</button>
          <button onClick={handleClick} className={"m-1 px-8 py-1 " + (activeTag ? "bg-hovertagColor" : "")}>#all</button>
          <button onClick={handleClick} className={"m-1 px-8 py-1 " + (activeTag ? "bg-hovertagColor" : "")}>#all</button>
        </div>

        <div className='flex text-md border-t w-full flex-col items-center'>
          <button className='flex items-center px-4 h-8 m-2'><BiImport className='mr-2' />Import</button>
          <button className='flex items-center px-4 m-2 h-8'><BiArchiveIn className='mr-2' />Archive</button>
        </div>
      </div>

    </div>
  )
}

export default tags