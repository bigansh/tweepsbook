import React, { useContext } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BookmarksContext } from '../../contexts/BookmarksContext'

const searchBar = () => {
	const { searchTerm, setSearchTerm } = useContext(BookmarksContext)

	return (
		<div className='px-4 py-2 flex items-center justify-between w-1/2  rounded-full border-[#9D9FA0] border max-w-3xl'>
			<input
				type='text'
				className='focus:outline-none p-2 flex-grow'
				placeholder='Which bookmark are you looking for?'
				onChange={(e) => {
					setSearchTerm(e.target.value)
				}}
			/>
			<button>
				<AiOutlineSearch className='text-2xl text-[#848484]' />
			</button>
		</div>
	)
}

export default searchBar
