import { useContext, useEffect, useState , React} from 'react'
import { BookmarksContext } from '../../contexts/BookmarksContext'
import Lottie from 'react-lottie-player'
import Loader from './loader.json'
import Masonry from 'react-masonry-css'
import BookmarkCard from './BookmarkCard'

const bookmarkCards = ({ archive }) => {
	const {
		bookmarks,
		sortByDate,
		sortByTweetDate,
		setSortByDate,
		setSortByTweetDate,
		activeTag,
		searchTerm,
		showLoader,
		setShowLoader,
	} = useContext(BookmarksContext)
	const [bookmarksToShow, setBookmarksToShow] = useState([])
	const sortBookmarksByDate = () => {
		if (sortByDate === null) {
			return []
		}
		console.log(bookmarks)
		return bookmarksToShow.sort((a, b) => {
			return sortByDate
				? new Date(b.backend.createdAt) - new Date(a.backend.createdAt)
				: new Date(a.backend.createdAt) - new Date(b.backend.createdAt)
		})
	}
	const sortBookmarksByTweetDate = () => {
		if (sortBookmarksByDate === null) {
			return []
		}
		return bookmarksToShow.sort((a, b) => {
			return sortByTweetDate
				? new Date(b.twitter.created_at) -
				new Date(a.twitter.created_at)
				: new Date(a.twitter.created_at) -
				new Date(b.twitter.created_at)
		})
	}
	useEffect(() => {
		console.log('sorting by date', sortByDate)
		console.log(
			'sorting by date type',
			sortByDate === null,
			typeof sortByDate
		)
		setBookmarksToShow([...sortBookmarksByDate()])
		console.log(sortBookmarksByDate())
	}, [sortByDate])

	useEffect(() => {
		console.log('sorting by tweet date', sortByTweetDate)
		setBookmarksToShow([...sortBookmarksByTweetDate()])
		console.log(sortBookmarksByTweetDate())
	}, [sortByTweetDate])

	const filterByTag = () => {
		//setShowLoader(true)
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

				if (tag.tag === activeTag?.tag) {
					tempBookmarksToShow.push(bookmark)
				}
			})
		})
		//setShowLoader(false)
		return tempBookmarksToShow
	}

	function getHighlightedText(text, higlight) {
		// Split text on higlight term, include term itself into parts, ignore case
		var parts = text.split(new RegExp(`(${higlight})`, "gi"));
		return parts.map((part, index) => (
			<div key={index}>
				{part.toLowerCase() === higlight.toLowerCase() ? (
					<b style={{ backgroundColor: "#e8bb49" }}>{part}</b>
				) : (
					part
				)}
			</div>
		));
	}

	const filterBySearchTerm = () => {
		//setShowLoader(true)
		let tempBookmarksToShow = []
		let bookmarksFilteredByTag = filterByTag()
		bookmarksFilteredByTag.map((bookmark) => {
			if (
				bookmark.twitter.text
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			) {
				getHighlightedText(bookmark.twitter.text, searchTerm)
				tempBookmarksToShow.push(bookmark)
			}
		})
		//setShowLoader(false)
		return tempBookmarksToShow
	}

	useEffect(() => {
		const tempBookmarksToShow = filterByTag()
		setBookmarksToShow([...tempBookmarksToShow])
		const tempSortByTweetDate = localStorage?.getItem('sortByTweetDate')
		setSortByTweetDate(tempSortByTweetDate)
		const tempSortByDate = localStorage?.getItem('sortByDate')
		setSortByDate(tempSortByDate)
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
