import React, { useContext, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineDown } from 'react-icons/ai'
import { AiOutlineUp } from 'react-icons/ai'

import TweepsBookIcon from './Icon'
import SearchBar from './SearchBar'
import BookmarkCards from './BookmarkCards'
import { BookmarksContext } from '../../contexts/BookmarksContext'

const DashNavbar = () => {
	const [menuActive, setMenuActive] = useState(false)
	const menuClick = () => {
		setMenuActive(!menuActive)
	}

	return (
		<div className='flex items-center px-5 justify-between h-24 border'>
			<TweepsBookIcon />

			{<SearchBar />}

			<div className='flex items-center justify-center'>
				<img
					src='https://pbs.twimg.com/profile_images/1541300431623598080/QNrH1wh1_400x400.jpg'
					className='w-12 h-12 m-1 rounded-full'
				/>
				<button className='m-1 p-1' onClick={menuClick}>
					{menuActive ? <AiOutlineUp /> : <AiOutlineDown />}
				</button>
				{menuActive ? (
					<div className='relative drop-shadow-xl rounded-md p-2 mt-10 w-32 z-10 bg-white'>
						<button className='flex items-center m-2'>
							<BiLogOut className='mr-2' />
							Logout
						</button>
						<button className='flex items-center m-2'>
							<FiSettings className='mr-2' />
							Settings
						</button>
					</div>
				) : (
					<div className='hidden relative flex-col drop-shadow-xl rounded-md p-2 mt-10 w-32 z-10 bg-white'>
						<button className='flex items-center m-2'>
							<BiLogOut className='mr-2' />
							Logout
						</button>
						<button className='flex items-center m-2'>
							<FiSettings className='mr-2' />
							Settings
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default DashNavbar
