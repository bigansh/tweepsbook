import React, { useEffect, useState } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { BiArchiveIn } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'
import { BookmarksContext } from '../../contexts/BookmarksContext'
import TagPill from './TagPill'
import { MdOutlineStickyNote2 } from 'react-icons/md'
import Masonry from 'react-masonry-css'
import Loader from './Loader'

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
		console.log('off hogA')
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

	return (
		<div className='flex flex-wrap p-3 overflow-auto'>
			{showLoader && <Loader />}
			<Masonry
				breakpointCols={3}
				className='my-masonry-grid'
				columnClassName='my-masonry-grid_column'
			>
				{/* array of JSX items */}
				{bookmarksToShow?.map((bookmark, index) => {
					return (
						bookmark.backend.read === (archive || false) && (
							<div
								className='flex flex-col rounded-md justify-between border  p-1 m-3 animate-[scale_.2s]'
								key={index}
							>
								<div className='w-full flex items-center'>
									<img
										src={
											bookmark.twitter.author
												.profile_image_url
										}
										className='w-10 h-10 rounded-full m-1 p-1'
									/>
									<span className='mx-1 px-2'>
										{bookmark.twitter.author.name}
									</span>
									<span className='font-thin text-xs w-32 px-2 '>
										@{bookmark.twitter.author.username} •{' '}
										{
											bookmark.twitter.created_at.split(
												'T'
											)[0]
										}
									</span>
									<div className='flex items-end p-2 justify-end'>
										<BsTwitter
											className='mx-3'
											style={{ color: '#1DA1F2' }}
										/>
									</div>
								</div>
								<p className='m-1 p-1'>
									{bookmark.twitter.text}
								</p>
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
