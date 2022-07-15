import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Lottie from 'react-lottie-player'
import Loader from '../../../src/components/loader.json'
import DashNavbar from '../../../src/components/DashNavbar'
import { BookmarksContext } from '../../../contexts/BookmarksContext'
import BookmarkCard from '../../../src/components/BookmarkCard'
import Toggle from '../../../src/components/Toggle'
import { UserContext } from '../../../contexts/UserContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'
import Script from 'next/script'

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
	const { getUser } = useContext(UserContext)

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
		console.log(selectedBookmark)
	}, [selectedBookmark])

	const copyLink = () => {
		setShowLoader(true)
		setTimeout(() => {
			navigator?.clipboard?.writeText(window?.location?.href)
			setShowLoader(false)
			setCopyButtonText('Copied!')
			toast.success('URL Copiured to clipboard!')
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
			<Head>
				<title>Notes | TweepsBook</title>
				<link rel='icon' href='/Logo.ico' />
				<meta
					property='og:title'
					content='If Notion & Pocket Had a Baby'
					key='title'
				/>
				<meta
					name='description'
					content='We’d call it TweepsBook. A notebook for storing, organizing, taking & sharing notes for all your favorite bookmarks.'
				/>
				<meta
					property='og:description'
					content='What Twitter could not do with Twitter Blue, we did it for free. TweepsBook is a better bookmarking tool that allows you to import, organize, take, & share notes on all your “gyan-worthy” bookmarks.'
				/>
				<meta
					property='og:image'
					content='https://i.postimg.cc/Qd2WknqK/Message-Header.png'
				/>
				<Script
					async
					src='https://www.googletagmanager.com/gtag/js?id=G-J0QPJQF85V'
				></Script>
				<Script
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
				  
					gtag('config', 'G-J0QPJQF85V'); `,
					}}
				/>
				<Script
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `
					!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="1t7Yw2EonU8mBWTA6X0FQNphh5fhN6Ah";;analytics.SNIPPET_VERSION="4.15.3";
					analytics.load("1t7Yw2EonU8mBWTA6X0FQNphh5fhN6Ah");
					analytics.page();
					}}();`,
					}}
				/>
			</Head>
			<DashNavbar search={false} />

			<div className='flex justify-around flex-grow'>
				<div className='flex flex-col p-1 w-1/3'>
					{selectedBookmark && (
						<BookmarkCard
							bookmark={selectedBookmark}
							ownershipStatus={selectedBookmark?.ownershipStatus}
						/>
					)}

					{/* Tweet Menu Functions */}
					{selectedBookmark?.ownershipStatus && (
						<div className='flex items-center w-full justify-between p-2'>
							Share bookmark to web
							<Toggle
								checked={shareChecked}
								onChange={() => {
									shareBookmark()
								}}
							/>
						</div>
					)}
					{selectedBookmark?.ownershipStatus && shareChecked && (
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
						preview={
							selectedBookmark?.ownershipStatus
								? 'live'
								: 'preview'
						}
						visibleDragbar='false'
						className='border rounded w-full '
					/>
					{selectedBookmark?.ownershipStatus && (
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
					)}
				</div>
			</div>
		</div>
	)
}

export default notes
