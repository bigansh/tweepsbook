import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';

const searchBar = () => {
    return (
        <div className='p-1 flex items-center justify-between w-1/2 h-1/2'>
            <input type="text" className="focus:outline-none m-1 p-2 pl-8 font-light border rounded-full w-full" placeholder="Which bookmark are you looking for?" />
            <button className='relative right-10'><AiOutlineSearch /></button>
        </div>
    )
}

export default searchBar