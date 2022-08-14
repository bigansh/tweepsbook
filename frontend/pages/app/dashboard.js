import { useEffect, useState, useContext, useRef } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { Router, useRouter } from 'next/router'
import Lottie from 'react-lottie-player'
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs'
import { AiOutlineDown } from 'react-icons/ai'
import { AiOutlineCalendar } from 'react-icons/ai'
import Tags from '../../src/components/Tags'
import BookmarkCards from '../../src/components/BookmarkCards'
import DashNavbar from '../../src/components/DashNavbar'
import MobileBar from '../../src/components/MobileBar'
import { BookmarksContext } from '../../contexts/BookmarksContext'
import Settings from './settings'
import { UserContext } from '../../contexts/UserContext'
import Loader from '../../src/components/loader.json'

export default function dashboard({ children }) {
	const router = useRouter()
	const sortMenuRef = useRef(null)
	const filterMenuRef = useRef(null)
	const [showImportModal, setShowImportModal] = useState(false)
	const { user, setUser, getUser } = useContext(UserContext)

	const [sortMenu, setSortMenu] = useState(false)
	const [filterMenu, setFilterMenu] = useState(false)
	const handleClickOutside = (e) => {
		if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
			setSortMenu(false)
			// setFilterMenu(false)
		}
		if (
			filterMenuRef.current &&
			!filterMenuRef.current.contains(e.target)
		) {
			// setSortMenu(false)
			setFilterMenu(false)
		}
	}
	const {
		bookmarks,
		setBookmarks,
		importBookmarks,
		fetchBookmarks,
		activeTag,
		setActiveTag,
		sortByDate,
		sortByTweetDate,
		setSortByDate,
		setSortByTweetDate,
		sortBySource,
		setSortBySource,
		stripHashtag,
		showLoader,
		setShowLoader,
	} = useContext(BookmarksContext)

	useEffect(() => {
		// setShowLoader(true)
		const verifyUser = async () => {
			try {
				setShowLoader(true)
				await getUser()
				await fetchBookmarks()
				setActiveTag(JSON.parse(localStorage.getItem('activeTag')))
				setShowLoader(false)
			} catch (err) {
				router.push('/')
			}
		}
		verifyUser()
		// setShowLoader(false)
	}, [])

	const [width, setWidth] = useState(1200) // default width, detect on server.
	const handleResize = () => setWidth(window.innerWidth)

	useEffect(() => {
		window.addEventListener('resize', handleResize)
	})
	const handleFirstImport = async () => {
		setShowImportModal(false)
		await importBookmarks()
	}
	useEffect(() => {
		const importOnFirstLogin = async () => {
			user?.importCount?.twitter === 0 && setShowImportModal(true)
		}
		importOnFirstLogin()
	}, [user])
	useEffect(() => {
		console.log({ showLoader })
	}, [showLoader])
	return (
		<div onClick={(e) => handleClickOutside(e)}>
			{showLoader && (
				<div className='w-[100vw] h-[100vh] absolute top-0 left-0 flex items-center justify-center bg-[#ffffff99] z-50'>
					<Lottie
						loop
						animationData={Loader}
						play
						className='w-60 h-60 '
					/>
				</div>
			)}
			<Head>
				<title>Dashboard / TweepsBook</title>
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
				<meta name='twitter:card' content='summary_large_image' />
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
			{router.query.settings === 'true' && <Settings />}

			<div className='overflow-hidden scroll-smooth fixed w-full h-full flex flex-col'>
				<DashNavbar search={true} />
				<MobileBar className='invisible' search={true} />

				<div className='flex overflow-hidden flex-grow'>
					<div className='flex invisible sm:visible flex-col items-start bg-dark-blue w-[180px] fixed content'>
						<Tags />
					</div>

					<div className='flex flex-col my-content w-screen bg-[#FBFAFA] pt-12 sm:pl-8'>
						{/* Sorting and filtering buttons */}
						<div className='flex border-b border-[#0000001e] items-center justify-between p-1 mr-3 ml-[15px] sm:ml-4 sm:mr-11'>
							<h1 className='pl-2 font-bold text-3xl font-header'>
								{children ? (
									<>#archive</>
								) : (
									activeTag && (
										<>#{stripHashtag(activeTag.tag)}</>
									)
								)}
							</h1>
							<div className='flex items-center gap-x-4'>
								<div
									className='flex flex-col'
									ref={sortMenuRef}
								>
									<button
										className='flex text-xs h-8 items-center px-4 py-2 justify-around opacity-100 border border-hover-blue rounded-full hover:bg-white'
										onClick={() => setSortMenu(!sortMenu)}
									>
										Sort By{' '}
										<AiOutlineDown className='ml-2' />
									</button>
									{sortMenu && (
										<div className='absolute text-sm flex flex-col top-[180px] right-10 drop-shadow-xl rounded-md p-1 z-10 bg-white'>
											<button
												className={
													'flex p-2 items-center hover:bg-gray-50 rounded ' +
													(sortByDate !== null &&
													!sortByDate
														? 'bg-gray-100'
														: 'bg-white')
												}
												onClick={() => {
													localStorage?.setItem(
														'sortByDate',
														false
													)
													localStorage?.removeItem(
														'sortByTweetDate'
													)
													setSortByDate(false)
													setSortByTweetDate(null)
													setSortBySource(false)
													setSortMenu(false)
												}}
											>
												<AiOutlineCalendar className='mr-1' />
												Date <BsArrowUpShort />
											</button>
											<button
												className={
													'flex p-2 items-center hover:bg-gray-50 rounded' +
													(sortByDate !== null &&
													sortByDate
														? 'bg-gray-100'
														: 'bg-white')
												}
												onClick={() => {
													localStorage?.setItem(
														'sortByDate',
														true
													)
													localStorage?.removeItem(
														'sortByTweetDate'
													)
													setSortByDate(true)
													setSortByTweetDate(null)
													setSortBySource(false)
													setSortMenu(false)
												}}
											>
												<AiOutlineCalendar className='mr-1' />
												Date <BsArrowDownShort />
											</button>
											<button
												className={
													'flex p-2 items-center hover:bg-gray-50 rounded ' +
													(sortByTweetDate !== null &&
													!sortByTweetDate
														? 'bg-gray-100'
														: 'bg-white')
												}
												onClick={() => {
													localStorage?.setItem(
														'sortByTweetDate',
														true
													)
													localStorage?.removeItem(
														'sortByDate'
													)
													setSortByDate(null)
													setSortByTweetDate(false)
													setSortBySource(false)
													setSortMenu(false)
												}}
											>
												<AiOutlineCalendar className='mr-1' />
												Tweet Date <BsArrowUpShort />
											</button>
											<button
												className={
													'flex p-2 items-center hover:bg-gray-50 rounded ' +
													(sortByTweetDate !== null &&
													sortByTweetDate
														? 'bg-gray-100'
														: 'bg-white')
												}
												onClick={() => {
													localStorage?.setItem(
														'sortByTweetDate',
														false
													)
													localStorage?.removeItem(
														'sortByDate'
													)
													setSortByDate(null)
													setSortByTweetDate(true)
													setSortBySource(false)
													setSortMenu(false)
												}}
											>
												<AiOutlineCalendar className='mr-1' />
												Tweet Date <BsArrowDownShort />
											</button>
										</div>
									)}
								</div>
								{/* <div
									className='flex flex-col'
									ref={filterMenuRef}
								>
									<button
										className='flex text-xs h-8 items-center px-4 py-2 justify-around border border-hover-blue rounded-full hover:bg-white'
										onClick={() =>
											setFilterMenu(!filterMenu)
										}
									>
										Add Filter{' '}
										<AiOutlinePlus className='ml-2' />
									</button>
									{filterMenu && (
										<div className='absolute text-sm flex flex-col top-[170px] drop-shadow-xl rounded-md p-2 z-10 bg-white'>
											<button className='flex p-1 items-center'>
												<MdOutlineSource className='mr-1' />
												Source
											</button>
										</div>
									)}
								</div> */}
							</div>
						</div>

						{/* Bookmarks */}
						<div className='overflow-y-scroll'>
							{showImportModal && (
								<div className='w-full h-full flex justify-center items-center'>
									<div className='border-2 rounded-lg flex flex-col p-4 items-center'>
										<span className='text-center text-lg'>
											You don't have any bookmarks to
											read.
											<br /> Import some from your
											twitter.
										</span>
										<button
											onClick={handleFirstImport}
											className='text-[16px] flex m-2 mx-4 bg-dark-blue hover:bg-hover-blue active:bg-dark-blue shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-100 text-white py-3 px-5 rounded-xl items-center w-[14rem] sm:w-[15rem] sm:h-[3rem] justify-center'
										>
											Import Bookmarks
										</button>
									</div>
								</div>
							)}
							{children || <BookmarkCards />}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
