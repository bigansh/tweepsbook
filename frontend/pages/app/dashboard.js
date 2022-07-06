import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AiOutlineDown } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import Tags from '../../src/components/Tags'
import BookmarkCards from '../../src/components/BookmarkCards'
import DashNavbar from '../../src/components/DashNavbar'
import { BookmarksProvider } from '../../contexts/BookmarksContext'
import { BookmarksContext } from '../../contexts/BookmarksContext'
export default function dashboard({ children }) {
	const [user, setUser] = useState({})
	const [menuActive, setMenuActive] = useState(false)
	const { bookmarks, setBookmarks, importBookmarks, fetchBookmarks } =
		useContext(BookmarksContext)
	const menuClick = () => {
		setMenuActive(!menuActive)
	}
	const getUser = async () => {
		const res = await axios.get(
			process.env.NEXT_PUBLIC_FETCH_ACCOUNT_DETAILS,
			{
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_SESSION_TOKEN}`,
				},
			}
		)
		console.log(res.data)
		setUser(res.data)
	}

	useEffect(() => {
		// importBookmarks()
		fetchBookmarks()
		getUser()
	}, [])

	return (
		<div className='overflow-hidden scroll-smooth'>
			<DashNavbar />

			<div className='flex '>
				<div className='flex flex-col items-start bg-dark-blue pt-10 w-56'>
					<Tags />
				</div>

				<div className='w-5/6 '>
					<div className='flex border-b items-center justify-between p-2 h-20'>
						<h1 className='pl-2 font-bold text-3xl'>#all</h1>
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
	)
}
