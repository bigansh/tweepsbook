import { useContext, useEffect, useState } from 'react'
import { BookmarksContext } from '../../contexts/BookmarksContext'
import Lottie from 'react-lottie-player'
import Loader from './loader.json'
import Masonry from 'react-masonry-css'
import BookmarkCard from './BookmarkCard'

const bookmarkCards = ({ archive }) => {
	const {
		bookmarks,
		sortByDate,
		activeTag,
		searchTerm,
		showLoader,
		setShowLoader,
	} = useContext(BookmarksContext)
	const [bookmarksToShow, setBookmarksToShow] = useState([])
	const sortBookmarksByDate = () => {
		return bookmarks.sort((a, b) => {
			return sortByDate
				? new Date(b.backend.createdAt) - new Date(a.backend.createdAt)
				: new Date(a.backend.createdAt) - new Date(b.backend.createdAt)
		})
	}
	useEffect(() => {
		console.log('sorting by date')
		setBookmarksToShow([...sortBookmarksByDate()])
		console.log(sortBookmarksByDate())
	}, [sortByDate])

	const filterByTag = () => {
		setShowLoader(true)
		// console.log('called')
		let tempBookmarksToShow = []
		bookmarks.forEach((bookmark) => {
			if (activeTag?.tag === 'all') {
				tempBookmarksToShow = bookmarks
				return
			}
			if (bookmark.backend.tags.length < 1) {
				return
			}
			bookmark.backend.tags.map((tag) => {
				// console.log('bookmark', bookmark)

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
		setBookmarksToShow([...tempBookmarksToShow])
	}, [bookmarks, activeTag])

	useEffect(() => {
		const tempBookmarksToShow = filterBySearchTerm()
		setBookmarksToShow([...tempBookmarksToShow])
		// console.log(activeTag)
	}, [searchTerm, activeTag])

	let msnry = new Masonry('.grid', {
		columnWidth: 200,
	})

	return (
		<div className='flex flex-wrap sm:p-3 overflow-auto w-full justify-center'>
			<Masonry
				breakpointCols={{ default: 3, 768: 1 }}
				className='my-masonry-grid'
				columnClassName='my-masonry-grid_column'
			>
				{/* array of JSX items */}
				{bookmarksToShow?.map((bookmark, index) => {
					return (
						bookmark.backend.read === (archive || false) && (
							<BookmarkCard
								bookmark={bookmark}
								key={bookmark.backend._id}
							/>
						)
					)
				})}
			</Masonry>
		</div>
	)
}

export default bookmarkCards
