import React, { useContext, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineDown } from 'react-icons/ai'
import { AiOutlineUp } from 'react-icons/ai'

import TweepsBookIcon from './Icon'
import SearchBar from './SearchBar'

const DashNavbar = ({ search }) => {
	const [menuActive, setMenuActive] = useState(false)
	const menuClick = () => {
		setMenuActive(!menuActive)
	}

	return (
		<div className='flex items-center px-5 justify-between h-[12vh] border'>
			<TweepsBookIcon />

			{search && <SearchBar />}

			<div className='flex items-center justify-center'>
				<img
					src='https://i.imgur.com/XqQXQZb.png'
					className='w-12 h-12 m-1 rounded-full'
				/>
				<button className='m-1 p-1' onClick={menuClick}>
					{menuActive ? <AiOutlineUp /> : <AiOutlineDown />}
				</button>
				{menuActive && (
					<div className='absolute top-12 drop-shadow-xl rounded-md p-2 mt-5 w-24 z-10 bg-white'>
						<button className='flex items-center m-1 text-sm'>
							<BiLogOut className='mr-2' />
							Logout
						</button>
						<button
							className='flex items-center m-1 text-sm'
							onClick={() =>
							(window.location.href =
								'/app/settings')
							}
						>
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
