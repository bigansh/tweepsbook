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
import Lottie from 'react-lottie-player'
import Loader from '../../../src/components/loader.json'
import DashNavbar from '../../../src/components/DashNavbar'
import { BookmarksContext } from '../../../contexts/BookmarksContext'
import BookmarkCard from '../../../src/components/BookmarkCard'
import Toggle from '../../../src/components/Toggle'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const notes = () => {
	const [copyButtonText, setCopyButtonText] = useState('Copy URL')
	const [shareChecked, setShareChecked] = useState(false)
	const [showLoader, setShowLoader] = useState(false)
	const { fetchBookmark, updateNotes, updateShareStatus } =
		useContext(BookmarksContext)
	const router = useRouter()
	const { bookmarkId } = router.query

	const [selectedBookmark, setSelectedBookmark] = useState(null)
	const [value, setValue] = useState('**Start taking your Notes Here...**')

	const getBookmark = async () => {
		setShowLoader(true)

		setSelectedBookmark(await fetchBookmark({ id: bookmarkId }))

		setShowLoader(false)
	}
	useEffect(() => {
		bookmarkId && getBookmark()
	}, [bookmarkId])
	useEffect(() => {
		setValue(
			selectedBookmark?.backend?.notes ??
				'**Start taking your Notes Here...**'
		)
		setShareChecked(selectedBookmark?.backend?.share ?? false)
	}, [selectedBookmark])

	const copyLink = () => {
		setShowLoader(true)
		setTimeout(() => {
			navigator?.clipboard?.writeText(window?.location?.href)
			setShowLoader(false)
			setCopyButtonText('Copied!')
		}, [200])
		setTimeout(() => {
			setCopyButtonText('Copy URL')
		}, [2000])
	}

	const shareBookmark = async () => {
		setShowLoader(true)
		setShareChecked(!shareChecked)
		selectedBookmark &&
			(await updateShareStatus({
				id: selectedBookmark?.backend?._id,
				currentStatus: selectedBookmark?.backend?.share,
			}))
		getBookmark()
		setShowLoader(false)
	}
	return (
		<div className='min-h-[100vh] bg-[#FBFAFA] flex flex-col'>
			<DashNavbar search={false} />

			<div className='flex justify-around flex-grow'>
				<div className='flex flex-col p-1 w-1/3'>
					{selectedBookmark && (
						<BookmarkCard bookmark={selectedBookmark} />
					)}

					{/* Tweet Menu Functions */}
					<div className='flex items-center w-full justify-between p-2'>
						Share bookmark to web
						<Toggle
							checked={shareChecked}
							onChange={() => {
								shareBookmark()
							}}
						/>
					</div>
					{shareChecked && (
						<div className='flex items-center w-full justify-between p-2 border rounded '>
							{window?.location?.href}
							<button
								className='text-white text-sm py-2 ml-auto my-2 px-4 w-28 rounded-lg border-dark-blue border-2 bg-dark-blue font-semibold'
								onClick={() => {
									copyLink()
								}}
							>
								{showLoader ? '...' : copyButtonText}
							</button>
						</div>
					)}
					{showLoader && (
						<Lottie
							loop
							animationData={Loader}
							play
							className='w-10 h-10 mx-auto'
						/>
					)}
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
