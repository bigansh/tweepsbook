import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { IconContext } from 'react-icons'
import { useRouter } from 'next/router'
import { GrNotes } from 'react-icons/gr'
import { BiTrashAlt } from 'react-icons/bi'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiArchiveIn } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'

import DashNavbar from '../../../src/components/DashNavbar'
import { BookmarksContext } from '../../../contexts/BookmarksContext'
import BookmarkCard from '../../../src/components/BookmarkCard'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const notes = () => {
	const { bookmarks, fetchBookmarks } = useContext(BookmarksContext)
	const router = useRouter()
	const { bookmarkId } = router.query

	const [value, setValue] = useState('**Start taking your Notes Here...**')
	const [eye, setEye] = useState(true)
	const [selectedBookmark, setSelectedBookmark] = useState(null)

	useEffect(() => {
		fetchBookmarks()
	}, [])
	useEffect(() => {
		// console.log(bookmarkId)
		// console.log(bookmarks)
		bookmarks.map((bookmark) => {
			// console.log('hello')
			// console.log(bookmark.backend._id)
			if (bookmark.backend._id === bookmarkId) {
				// console.log(bookmark)
				setSelectedBookmark(bookmark)
			}
		})
		// console.log(temp)
		// setSelectedBookmark()
	}, [bookmarks, bookmarkId])
	return (
		<div className='min-h-[100vh] bg-[#FBFAFA] '>
			<DashNavbar search={false} />

			<div className='flex justify-around '>
				<div className='flex flex-col p-1 w-1/3 justify-between'>
					{selectedBookmark && (
						<BookmarkCard bookmark={selectedBookmark} />
					)}

					{/* Tweet Menu Functions */}
					<div className='flex justify-center items-center w-full'></div>
				</div>

				<div className='flex m-4 w-1/2' data-color-mode='light'>
					<MDEditor
						value={value}
						onChange={setValue}
						height='350'
						preview='live'
						visibleDragbar='false'
						className='borde rounded w-full'
					/>
				</div>
			</div>
		</div>
	)
}

export default notes
