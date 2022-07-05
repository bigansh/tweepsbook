import React, { useState } from 'react'

const tags = () => {

  const [activeTag, setActiveTag] = useState(false);

  const handleClick = () => {
    setActiveTag(!activeTag);
  }

  return (
    <div className="flex flex-col items-start h-full w-full mt-2 text-white">
      <h1 className='text-xl mb-10 font-bold pl-5'>TAGS</h1>
      <div className='flex text-md w-full flex-col items-center'>
        <button onClick={handleClick} className={"m-1 px-4 " + ( activeTag ? "bg-sh-gray" : "") }>#nft</button>
      </div>
    </div>
  )
}

export default tags