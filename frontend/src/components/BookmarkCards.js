import React, { useEffect } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { BiArchiveIn } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'
import { BookmarksContext } from '../../contexts/BookmarksContext'
import TagPill from './TagPill'
import { MdOutlineStickyNote2 } from 'react-icons/md'
const bookmarkCards = ({ archive }) => {
	const {
		bookmarks,
		updateReadStatus,
		deleteBookmark,
		activeTag,
		searchTerm,
	} = React.useContext(BookmarksContext)
	const [bookmarksToShow, setBookmarksToShow] = React.useState([])

	const filterByTag = () => {
		console.log('called')
		let tempBookmarksToShow = []
		bookmarks.map((bookmark) => {
			if (bookmark.backend.tags.length < 1) {
				tempBookmarksToShow.push(bookmark)
				return
			}
			bookmark.backend.tags.map((tag) => {
				console.log('bookmark', bookmark)
				if (activeTag.tag === 'all') {
					tempBookmarksToShow = bookmarks
					return
				}
				if (tag.tag === activeTag.tag) {
					tempBookmarksToShow.push(bookmark)
				}
			})
		})
		return tempBookmarksToShow
	}
	const filterBySearchTerm = () => {
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
		<div className='flex flex-wrap p-3 overflow-auto h-full '>
			{bookmarksToShow?.map((bookmark, index) => {
				return (
					bookmark.backend.read === (archive || false) && (
						<div
							className='flex flex-col rounded-md border w-96 h-fit p-1 m-2 animate-[scale_.2s]'
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
								<span className='mx-1'>
									{bookmark.twitter.author.name}
								</span>
								<span className='mx-1 font-thin text-xs'>
									@{bookmark.twitter.author.username} •{' '}
									{bookmark.twitter.created_at}
								</span>
								<div className='flex items-center p-2 justify-end'>
									<BsTwitter className='mx-3' />
								</div>
							</div>
							<p className='m-1 p-1'>{bookmark.twitter.text}</p>
							<div className='flex items-start  p-2 justify-between '>
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
											deleteBookmark(bookmark.backend._id)
										}
									/>
									<MdOutlineStickyNote2 className='mx-3 w-5 h-5 cursor-pointer hover:scale-110 icon-grey' />
								</div>
							</div>
						</div>
					)
				)
			})}
		</div>
	)
}

export default bookmarkCards
