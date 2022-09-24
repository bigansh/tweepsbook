import React, { useState, useEffect, useContext } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BookmarksContext } from '../../contexts/BookmarksContext'

const searchBar = () => {
	const { searchTerm, setSearchTerm } = useContext(BookmarksContext)
	const [width, setWidth] = useState(0) // default width, detect on server.

	const handleResize = () => setWidth(window.innerWidth);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [handleResize]);

	return (
		<div className='px-4 hidden sm:flex py-1 items-center justify-between w-1/2 rounded-full border-mid-gray focus-within:opacity-70 border max-w-3xl'>
			<input
				type='text'
				className='focus:outline-none p-2 flex-grow text-sm sm:text-base font-medium tracking-wider'
				placeholder='Which bookmark are you looking for?'
				onChange={(e) => {
					setSearchTerm(e.target.value)
				}}
				value={searchTerm}
			/>
			<button>
				{<AiOutlineSearch className='text-2xl text-[#848484] ' />}
			</button>
		</div>
	)
}

export default searchBar
