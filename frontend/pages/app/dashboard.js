import { useEffect, useState, useContext, useRef } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineAppstore } from 'react-icons/ai'
import { AiOutlineCalendar } from 'react-icons/ai'
import { MdOutlineSource } from 'react-icons/md'
import Tags from '../../src/components/Tags'
import BookmarkCards from '../../src/components/BookmarkCards'
import DashNavbar from '../../src/components/DashNavbar'
import { BookmarksProvider } from '../../contexts/BookmarksContext'
import { BookmarksContext } from '../../contexts/BookmarksContext'
import { Router, useRouter } from 'next/router'
import Settings from './settings'
import { UserContext } from '../../contexts/UserContext'
import Lottie from 'react-lottie-player'
import Loader from '../../src/components/loader.json'
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs'

export default function dashboard({ children }) {
	const router = useRouter()
	const sortMenuRef = useRef(null)
	const filterMenuRef = useRef(null)

	const { user, setUser, getUser } = useContext(UserContext)

	const [sortMenu, setSortMenu] = useState(false)
	const [filterMenu, setFilterMenu] = useState(false)
	const handleClickOutside = (e) => {
		if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
			setSortMenu(false)
			// setFilterMenu(false)
		}
		if (
			filterMenuRef.current &&
			!filterMenuRef.current.contains(e.target)
		) {
			// setSortMenu(false)
			setFilterMenu(false)
		}
	}
	const {
		bookmarks,
		setBookmarks,
		importBookmarks,
		fetchBookmarks,
		activeTag,
		setActiveTag,
		sortByDate,
		setSortByDate,
		sortBySource,
		setSortBySource,
	} = useContext(BookmarksContext)

	useEffect(() => {
		const verifyUser = async () => {
			try {
				await getUser()
			} catch (err) {
				router.push('/')
			}
		}
		verifyUser()
		fetchBookmarks()
		setActiveTag(JSON.parse(localStorage.getItem('activeTag')))
	}, [])
	return (
		<div onClick={(e) => handleClickOutside(e)}>
			{router.query.settings === 'true' && <Settings />}
			<div className='overflow-hidden scroll-smooth fixed w-full h-full flex flex-col'>
				<DashNavbar search={true} />

				<div className='flex overflow-hidden  flex-grow'>
					<div className='flex flex-col items-start bg-dark-blue w-[180px] fixed content'>
						<Tags />
					</div>

					<div className='flex flex-col my-content w-full bg-[#FBFAFA] pt-12 pl-8'>
						{/* Sorting and filtering buttons */}
						<div className='flex border-b border-[#0000001e] items-center justify-between p-2 mr-8'>
							<h1 className='pl-2 font-bold text-3xl font-header'>
								{children ? (
									<>#Archive</>
								) : (
									activeTag && <>#{activeTag.tag}</>
								)}
							</h1>
							<div className='flex items-center gap-x-4'>
								<div
									className='flex flex-col'
									ref={sortMenuRef}
								>
									<button
										className='flex text-xs h-8 items-center px-4 py-2 justify-around opacity-100 border border-hover-blue rounded-full hover:bg-white'
										onClick={() => setSortMenu(!sortMenu)}
									>
										Sort By{' '}
										<AiOutlineDown className='ml-2' />
									</button>
									{sortMenu && (
										<div className='absolute text-sm flex flex-col top-[180px] drop-shadow-xl rounded-md p-1 z-10 bg-white'>
											<button
												className={
													'flex p-2 w-[100px] items-center hover:bg-gray-50 rounded ' +
													(!sortByDate
														? 'bg-gray-100'
														: 'bg-white')
												}
												onClick={() => {
													setSortByDate(false)
													setSortBySource(false)
													setSortMenu(false)
												}}
											>
												<AiOutlineCalendar className='mr-1' />
												Date <BsArrowUpShort />
											</button>
											<button
												className={
													'flex p-2 w-[100px] items-center hover:bg-gray-50 rounded ' +
													(sortByDate
														? 'bg-gray-100'
														: 'bg-white')
												}
												onClick={() => {
													setSortByDate(true)
													setSortBySource(false)
													setSortMenu(false)
												}}
											>
												<AiOutlineCalendar className='mr-1' />
												Date <BsArrowDownShort />
											</button>
										</div>
									)}
								</div>
								{/* <div
									className='flex flex-col'
									ref={filterMenuRef}
								>
									<button
										className='flex text-xs h-8 items-center px-4 py-2 justify-around border border-hover-blue rounded-full hover:bg-white'
										onClick={() =>
											setFilterMenu(!filterMenu)
										}
									>
										Add Filter{' '}
										<AiOutlinePlus className='ml-2' />
									</button>
									{filterMenu && (
										<div className='absolute text-sm flex flex-col top-[170px] drop-shadow-xl rounded-md p-2 z-10 bg-white'>
											<button className='flex p-1 items-center'>
												<MdOutlineSource className='mr-1' />
												Source
											</button>
										</div>
									)}
								</div> */}
							</div>
						</div>

						{/* Bookmarks */}
						<div className='overflow-y-scroll'>
							{children || <BookmarkCards />}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
