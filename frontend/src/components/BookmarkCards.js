import React, { useEffect } from 'react'
import { format } from 'date-fns';
import { BiTrashAlt } from 'react-icons/bi'
import { BiArchiveIn } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'
import { BookmarksContext } from '../../contexts/BookmarksContext'
import TagPill from './TagPill'
import { MdOutlineStickyNote2 } from 'react-icons/md'
import Lottie from 'react-lottie-player'
import Loader from './loader.json'

import Masonry from 'react-masonry-css'

const bookmarkCards = ({ archive }) => {
	const {
		bookmarks,
		updateReadStatus,
		deleteBookmark,
		activeTag,
		searchTerm,
		showLoader,
		setShowLoader,
	} = React.useContext(BookmarksContext)
	const [bookmarksToShow, setBookmarksToShow] = React.useState([])

	const filterByTag = () => {
		setShowLoader(true)
		console.log('called')
		let tempBookmarksToShow = []
		bookmarks.forEach((bookmark) => {
			if (activeTag.tag === 'all') {
				tempBookmarksToShow = bookmarks
				return
			}
			if (bookmark.backend.tags.length < 1) {
				return
			}
			bookmark.backend.tags.map((tag) => {
				console.log('bookmark', bookmark)

				if (tag.tag === activeTag.tag) {
					tempBookmarksToShow.push(bookmark)
				}
			})
		})
		setShowLoader(false)
		return tempBookmarksToShow
	}
	const filterBySearchTerm = () => {
		setShowLoader(true)
		let tempBookmarksToShow = []
		let bookmarksFilteredByTag = filterByTag()
		bookmarksFilteredByTag.map((bookmark) => {
			if (
				bookmark.twitter.text
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			) {
				tempBookmarksToShow.push(bookmark)
			}
		})
		setShowLoader(false)
		return tempBookmarksToShow
	}

	useEffect(() => {
		const tempBookmarksToShow = filterByTag()
		console.log({ tempBookmarksToShow })
		setBookmarksToShow([...tempBookmarksToShow])
	}, [bookmarks, activeTag])

	useEffect(() => {
		console.log('bookmarksToShow', bookmarksToShow)
	}, [bookmarksToShow])

	useEffect(() => {
		const tempBookmarksToShow = filterBySearchTerm()
		setBookmarksToShow([...tempBookmarksToShow])
		console.log(tempBookmarksToShow)
	}, [searchTerm, activeTag])
	var msnry = new Masonry('.grid', {
		columnWidth: 200,
	})
	return (
		<div className='flex flex-wrap p-3 overflow-auto'>
			{showLoader && (
				<Lottie
					loop
					animationData={Loader}
					play
					className='w-10 h-10 mx-auto'
				/>
			)}
			<Masonry
				breakpointCols={2}
				className='my-masonry-grid'
				columnClassName='my-masonry-grid_column'
			>
				{/* array of JSX items */}
				{bookmarksToShow?.map((bookmark, index) => {
					const createdTime = new Date(bookmark.twitter.created_at)
					console.log(createdTime)

					return (
						bookmark.backend.read === (archive || false) && (
							<div
								className='flex border-mid-blue flex-col rounded-md border justify-between p-2 m-2 animate-[scale_.2s]'
								key={index}
							>
								<div className='w-full flex items-center justify-between'>
									<div className='flex w-5/6 items-center'>
										<img
											src={
												bookmark.twitter.author
													.profile_image_url
											}
											className='w-10 h-10 rounded-full m-1'
										/>
										<span className='px-2'>
											{bookmark.twitter.author.name}
											{bookmark.twitter.author.verified ? (
												<svg
													aria-label="Verified Account"
													className="text-blue-500 inline h-4 w-4"
													viewBox="0 0 24 24"
												>
													<g fill="currentColor">
														<path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
													</g>
												</svg>
											) : null}
										</span>

										<span className='font-thin text-xs px-2'>
											@{bookmark.twitter.author.username} •{' '}
											{
												<time

												>
													{format(createdTime, 'h:mm a - MMM d, y')}
												</time>
											}
										</span>
									</div>
									<div className='flex items-end p-2 justify-end'>
										<BsTwitter
											className='mx-3'
											style={{ color: '#1DA1F2' }}
										/>
									</div>
								</div>
								<div className='mt-4 mb-1 pl-2 whitespace-pre-wrap '>{bookmark.twitter.text.replace(/https:\/\/[\n\S]+/g, '')
									.replace('&amp;', '&')}
								</div>
								{bookmark.twitter.media && bookmark.twitter.media.length ? (
									<div
										className={
											bookmark.twitter.media.length === 1
												? 'inline-grid grid-cols-1 gap-x-2 gap-y-2 my-2'
												: 'inline-grid grid-cols-2 gap-x-2 gap-y-2 my-2'
										}
									>
										{bookmark.twitter.media.map((m) => (
											<img
												key={m.media_key}
												alt=""
												height={m.height}
												width={m.width}
												src={m.url}
												className="rounded"
											/>
										))}
									</div>
								) : null}

								<div className='flex items-start p-2 justify-between '>
									<TagPill bookmark={bookmark} />
									<div className='flex items-start'>
										<BiArchiveIn
											className='mx-3 w-5 h-5 cursor-pointer hover:scale-110 icon-grey'
											onClick={() =>
												updateReadStatus({
													id: bookmark.backend._id,
													currentStatus:
														bookmark.backend.read,
												})
											}
										/>
										<BiTrashAlt
											className='mx-3 w-5 h-5 cursor-pointer hover:scale-110 icon-grey'
											onClick={() =>
												deleteBookmark(
													bookmark.backend._id
												)
											}
										/>
										<MdOutlineStickyNote2 className='mx-3 w-5 h-5 cursor-pointer hover:scale-110 icon-grey' />
									</div>
								</div>
							</div>
						)
					)
				})}
			</Masonry>
		</div>
	)
}

export default bookmarkCards
