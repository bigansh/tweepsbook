import React, { useContext } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BookmarksContext } from '../../contexts/BookmarksContext'

const searchBar = () => {
	const { searchTerm, setSearchTerm } = useContext(BookmarksContext)

	return (
		<div className='p-1 flex items-center justify-between w-1/2 h-1/2'>
			<input
				type='text'
				className='focus:outline-none m-1 p-2 pl-8 font-light border rounded-full w-full'
				placeholder='Which bookmark are you looking for?'
				onChange={(e) => {
					setSearchTerm(e.target.value)
				}}
			/>
			<button className='relative right-10'>
				<AiOutlineSearch />
			</button>
		</div>
	)
}

export default searchBar
