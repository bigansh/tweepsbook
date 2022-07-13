import React, { useContext, useState } from 'react'
import { IoMdExit } from 'react-icons/io'
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
	const Logout = () => {
		localStorage.removeItem('sessionToken')
		window.location.reload()
	}
	return (
		<div className='flex items-center px-5 justify-between min-h-[80px] shadow-lg '>
			<a href='/app/dashboard'>
				<TweepsBookIcon />
			</a>

			{search && <SearchBar />}

			<div className='flex items-center justify-center relative text-[#3A3A3D] '>
				<img
					src='https://i.imgur.com/XqQXQZb.png'
					className='w-12 h-12 m-1 rounded-full'
				/>
				<button className='m-1 p-1 ' onClick={menuClick}>
					{menuActive ? <AiOutlineUp /> : <AiOutlineDown />}
				</button>
				{menuActive && (
					<div className='absolute top-[100%] right-4 drop-shadow-xl rounded-md p-1.5 border z-10 bg-white w-36'>
						<button
							className='flex items-center mb-1 px-2 py-2 rounded text-sm w-full bg-gray-50 hover:bg-gray-100 transition-all duration-100'
							onClick={Logout}
						>
							<IoMdExit className='text-xl mr-4' />
							Logout
						</button>
						<button
							className='flex items-center px-2 py-2 rounded text-sm w-full bg-gray-50 hover:bg-gray-100 transition-all duration-100'
							onClick={() =>
								(window.location.href = '/app/settings')
							}
						>
							<FiSettings className='text-xl mr-4' />
							Settings
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default DashNavbar
