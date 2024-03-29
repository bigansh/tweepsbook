import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const variants = {
	open: { opacity: 1, x: 0 },
	closed: { opacity: 0, x: '-100%' },
}

import { MdSystemUpdateAlt } from 'react-icons/md'
import { IoIosClose, IoMdArchive } from 'react-icons/io'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import { BookmarksContext } from '../../contexts/BookmarksContext'

import { UserContext } from '../../contexts/UserContext'
import { useRouter } from 'next/router'

const DashNavbar = ({ search }) => {
	const { searchTerm, setSearchTerm, stripHashtag } =
		useContext(BookmarksContext)
	const { user, getUser } = useContext(UserContext)
	const [menuActive, setMenuActive] = useState(false)
	const router = useRouter()
	const menuClick = () => {
		setMenuActive(!menuActive)
	}
	useEffect(() => {
		getUser()
	}, [])

	const Logout = () => {
		localStorage.removeItem('sessionToken')
		window.location.reload()
	}

	const { fetchTags, activeTag, setActiveTag, bookmarks, deleteTag } =
		useContext(BookmarksContext)
	const [tags, setTags] = useState([])

	useEffect(() => {
		importTags()
		// console.log(activeTag)
	}, [bookmarks])
	const removeTag = async (tag) => {
		try {
			await deleteTag(tag._id)
			localStorage.removeItem('activeTag')
			// setActiveTag({ tag: 'all', _id: 'all' })
		} catch (err) {
			console.log(err)
		}
	}
	const importTags = async () => {
		const tempTags = await fetchTags()
		setTags([{ tag: 'all', _id: 'all' }, ...tempTags])
		if (window.location.pathname === '/app/dashboard/archive') {
			setActiveTag({ tag: 'all', _id: 'all' })
			return
		}
		localStorage.getItem('activeTag')
			? setActiveTag(JSON.parse(localStorage.getItem('activeTag')))
			: setActiveTag({ tag: 'all', _id: 'all' })
	}

	const handleClick = async (tag) => {
		setActiveTag(tag)
		setMenuActive(!menuActive)
		localStorage.setItem('activeTag', JSON.stringify(tag))
		window?.location.pathname !== '/app/dashboard' &&
			router.push('/app/dashboard')
	}
	const { importBookmarks } = useContext(BookmarksContext)

	return (
		<div className='flex sm:hidden items-center px-5 justify-between py-4 shadow-lg bg-gray'>
			<button onClick={menuClick}>
				<AiOutlineMenuUnfold />
			</button>
			<motion.nav
				animate={menuActive ? 'open' : 'closed'}
				variants={variants}
				className='flex items-center w-1/2 z-10 absolute left-0 top-20 justify-center text-[#3A3A3D] bg-dark-blue '
			>
				{menuActive && (
					<div className='flex flex-col justify-between h-[91vh] items-start text-white flex-grow '>
						<div className='flex w-full justify-between px-8 py-8'>
							<h1 className='mr-2 font-semibold tracking-wider'>
								TAGS
							</h1>
						</div>
						<div className='flex justify-between overflow-y-scroll w-full flex-col items-start flex-grow'>
							<div className='flex overflow-y-scroll flex-col items-start w-full px-4'>
								{tags &&
									tags.map((tag) => {
										return (
											<button
												key={tag._id}
												onClick={() => handleClick(tag)}
												className={
													'my-1 pl-4 py-1 min-h-[1.5rem] rounded-md w-full flex text-ellipsis justify-between overflow-hidden whitespace-nowrap items-center ' +
													(activeTag?._id === tag?._id
														? 'bg-hovertagColor'
														: 'bg-transparent hover:bg-hovertagColor hover:bg-opacity-50')
												}
											>
												#{stripHashtag(tag.tag)}
												{tag?._id === activeTag?._id &&
													tag?._id !== 'all' && (
														<IoIosClose
															className='w-5 h-5 ml-0.5 cursor-pointer rounded-full hover:bg-dark-blue opacity-50 hover:bg-opacity-5 hover:opacity-100 transition-all duration-100'
															onClick={() =>
																removeTag(tag)
															}
														/>
													)}
											</button>
										)
									})}
							</div>

							<div className='flex text-md w-full mt-2 flex-col items-center'>
								<button
									className='flex items-center justify-center py-4 border-t border-[#d8d8d840] hover:bg-gray-900 hover:bg-opacity-10 w-full'
									onClick={importBookmarks}
								>
									<MdSystemUpdateAlt className='mr-2 text-sm' />
									Import
								</button>
								<button
									className='flex items-center justify-center py-4 border-t border-[#d8d8d840] hover:bg-gray-900 hover:bg-opacity-10 w-full'
									onClick={() =>
										(window.location.href =
											'/app/dashboard/archive')
									}
								>
									<IoMdArchive className='mr-2 text-sm' />
									Archive
								</button>
							</div>
						</div>
					</div>
				)}
			</motion.nav>

			{search && (
				<div className='px-4 py-1 border w-5/6 flex sm:hidden items-center justify-between rounded-full border-mid-gray focus-within:opacity-70'>
					<input
						type='text'
						className='focus:outline-none p-2 flex-grow text-[10px] sm:text-base font-medium tracking-wider'
						placeholder='Which bookmark are you looking for?'
						onChange={(e) => {
							setSearchTerm(e.target.value)
						}}
						value={searchTerm}
					/>
					<button>
						{
							<AiOutlineSearch className='text-2xl text-[#848484] ' />
						}
					</button>
				</div>
			)}
		</div>
	)
}

export default DashNavbar
