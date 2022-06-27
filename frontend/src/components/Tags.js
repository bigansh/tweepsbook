import React from 'react'

const tags = () => {
  return (
    <div className="flex flex-col items-start h-full w-full mt-2 text-white">
      <h1 className='text-xl mb-10 font-bold pl-10'>TAGS</h1>
        <div className='flex flex-col ml-10 items-start'>
        <button className="m-1 p-1 ">#tags1</button>
        <button className="m-1 p-1 ">#nft</button>
        <button className="m-1 p-1 ">#resources</button>
        <button className="m-1 p-1 ">#work</button>
        <button className="m-1 p-1 ">#sheets</button>
        </div>
    </div>
  )
}

export default tags