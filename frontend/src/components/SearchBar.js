import React, { useContext } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BookmarksContext } from '../../contexts/BookmarksContext'

const searchBar = () => {
	const { searchTerm, setSearchTerm } = useContext(BookmarksContext)

	return (
		<div className='px-4 py-1 flex items-center justify-between w-1/2 rounded-full border-mid-gray focus-within:opacity-70 border max-w-3xl'>
			<input
				type='text'
				className='focus:outline-none p-2 flex-grow text-base font-medium tracking-wider'
				placeholder='Which bookmark are you looking for?'
				onChange={(e) => {
					setSearchTerm(e.target.value)
				}}
				value={searchTerm}
			/>
			<button>
				<AiOutlineSearch className='text-2xl text-[#848484]' />
			</button>
		</div>
	)
}

export default searchBar
