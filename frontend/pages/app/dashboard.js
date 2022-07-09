import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AiOutlineDown } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import Tags from '../../src/components/Tags'
import BookmarkCards from '../../src/components/BookmarkCards'
import DashNavbar from '../../src/components/DashNavbar'
import { BookmarksProvider } from '../../contexts/BookmarksContext'
import { BookmarksContext } from '../../contexts/BookmarksContext'
import { Router, useRouter } from 'next/router'
import Settings from '../../src/components/Settings'
import { UserContext } from '../../contexts/UserContext'
export default function dashboard({ children }) {
	const { user, setUser, getUser } = useContext(UserContext)
	const [menuActive, setMenuActive] = useState(false)
	const {
		bookmarks,
		setBookmarks,
		importBookmarks,
		fetchBookmarks,
		activeTag,
	} = useContext(BookmarksContext)
	const menuClick = () => {
		setMenuActive(!menuActive)
	}

	useEffect(() => {
		fetchBookmarks()
		getUser()
	}, [])
	const router = useRouter()
	return (
		<>
			{router.query.settings === 'true' && <Settings />}
			<div className='overflow-hidden scroll-smooth fixed w-full'>
				<DashNavbar />

				<div className='flex overflow-hidden'>
					<div className='flex flex-col items-start bg-dark-blue pt-10 w-56 sidebar fixed'>
						<Tags />
					</div>

					<div className='w-full flex flex-col sidebar my-content'>
						<div className='flex border-b items-center justify-between p-2 h-20 '>
							<h1 className='pl-2 font-bold text-3xl'>
								#{activeTag?.tag}
							</h1>
							<div className='flex items-center'>
								<button className='flex text-xs h-8 items-center p-2 mx-3 justify-around opacity-80 border  rounded-xl'>
									Sort By <AiOutlineDown className='mr-2' />
								</button>
								<button className='flex text-xs h-8 items-center p-2 mx-3 justify-around opacity-80 border rounded-xl'>
									<AiOutlinePlus /> Add Filter
								</button>
							</div>
						</div>
						{children || <BookmarkCards />}
					</div>
				</div>
			</div>
		</>
	)
}
