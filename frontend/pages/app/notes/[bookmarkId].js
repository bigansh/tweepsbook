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
	const { fetchBookmark, updateNotes } = useContext(BookmarksContext)
	const router = useRouter()
	const { bookmarkId } = router.query

	const [selectedBookmark, setSelectedBookmark] = useState(null)
	const [value, setValue] = useState('**Start taking your Notes Here...**')

	useEffect(() => {
		const getBookmark = async () => {
			setSelectedBookmark(await fetchBookmark({ id: bookmarkId }))
		}
		bookmarkId && getBookmark()
	}, [bookmarkId])
	useEffect(() => {
		setValue(
			selectedBookmark?.backend?.notes ??
				'**Start taking your Notes Here...**'
		)
	}, [selectedBookmark])
	return (
		<div className='min-h-[100vh] bg-[#FBFAFA] flex flex-col'>
			<DashNavbar search={false} />

			<div className='flex justify-around flex-grow'>
				<div className='flex flex-col p-1 w-1/3 justify-between'>
					{selectedBookmark && (
						<BookmarkCard bookmark={selectedBookmark} />
					)}

					{/* Tweet Menu Functions */}
					<div className='flex justify-center items-center w-full'></div>
				</div>

				<div
					className='flex flex-col m-4 w-1/2 '
					data-color-mode='light'
				>
					<MDEditor
						value={value}
						onChange={setValue}
						height='80vh'
						preview='live'
						visibleDragbar='false'
						className='border rounded w-full '
					/>
					<button
						className='text-white text-sm py-2 ml-auto my-2 px-4 rounded-lg border-dark-blue border-2 bg-dark-blue font-semibold'
						onClick={() => {
							updateNotes({
								id: selectedBookmark?.backend._id,
								notes: value,
							})
						}}
					>
						Save Notes
					</button>
				</div>
			</div>
		</div>
	)
}

export default notes
