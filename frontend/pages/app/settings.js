import { useContext, useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { UserContext } from '../../contexts/UserContext'
import twitterIcon from '../../src/images/twitter_icon_blue.png'
import Head from 'next/head'
import Script from 'next/script'


const Settings = () => {
	const { user, setUser, getUser, updateUser, deleteUser } =
		useContext(UserContext)
	useEffect(() => {
		getUser()
	}, [])
	console.log('user', user)
	const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] =
		useState(false)
	const enableInput = (id) => {
		document.getElementById(id).disabled = false
		document.getElementById(id).focus()
	}
	const disableInput = (id) => {
		document.getElementById(id).disabled = true
		// document.getElementById(id).focus()
	}

	const [name, setName] = useState(user?.name)
	const [email, setEmail] = useState(user?.email)
	const [unreadCount, setUnreadCount] = useState(user?.unreadCount)

	const saveUserDetails = async () => {
		const newUserDetails = {
			accountDetails: {
				email: email,
				unreadCount: unreadCount,
				name: name,
			},
		}
		await updateUser(newUserDetails)
		window.location.href = '/app/settings'
	}
	return (
		<div className='w-full h-full absolute top-0 left-0 bg-sh-gray bg-opacity-80 z-50 flex items-center justify-center'>
			<Head>
			<link rel="icon" href="/Logo.ico" />
				<meta property="og:title" content="If Notion & Pocket Had a Baby" key="title" />
				<meta name="description" content="We’d call it TweepsBook. A notebook for storing, organizing, taking & sharing notes for all your favorite bookmarks." />
				<meta property="og:description" content="What Twitter could not do with Twitter Blue, we did it for free. TweepsBook is a better bookmarking tool that allows you to import, organize, take, & share notes on all your “gyan-worthy” bookmarks." />
				<meta property="og:image" content="https://i.postimg.cc/Qd2WknqK/Message-Header.png" />
				<meta name="twitter:card" content="summary_large_image" />
				<Script async src="https://www.googletagmanager.com/gtag/js?id=G-J0QPJQF85V"></Script>
				<Script strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
				  
					gtag('config', 'G-J0QPJQF85V'); `,
					}} />
				<Script strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
					!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="1t7Yw2EonU8mBWTA6X0FQNphh5fhN6Ah";;analytics.SNIPPET_VERSION="4.15.3";
					analytics.load("1t7Yw2EonU8mBWTA6X0FQNphh5fhN6Ah");
					analytics.page();
					}}();`,
					}} />
			</Head>
			<div className='bg-[#F5F5F5] rounded flex flex-col py-10 px-10'>
				<div className='grid grid-cols-3 gap-x-8 auto-rows-auto'>
					<div className='bg-white p-4 flex flex-col items-center justify-center rounded-lg'>
						<div className='w-32 h-32 '>
							<img
								src={user?.profile_image}
								alt='User Profile Image'
								className='w-full h-full rounded-full'
							/>
						</div>
						<div className='flex bg-[#FAFAFA] p-3 rounded-md border border-lg-gray mt-5 items-center'>
							<input
								type='text'
								className=' bg-[#FAFAFA] text-sm text-[#666666] p-2'
								placeholder={'Your Name'}
								defaultValue={user?.name}
								disabled={true}
								name='userName'
								id='userName'
								onChange={(e) => {
									setName(e.target.value)
								}}
								onBlur={() => disableInput('userName')}
							/>
							<BiPencil
								className='icon-light-grey cursor-pointer'
								onClick={() => {
									enableInput('userName')
								}}
							/>
						</div>
						<div className='flex bg-[#FAFAFA] p-3 rounded-md border border-lg-gray mt-5 items-center'>
							<input
								type='text'
								className=' bg-[#FAFAFA] text-sm text-[#666666] p-2'
								placeholder={'Your Email'}
								defaultValue={user?.email}
								disabled={true}
								name='userEmail'
								id='userEmail'
								onChange={(e) => {
									setEmail(e.target.value)
								}}
								onBlur={() => disableInput('userEmail')}
							/>
							<BiPencil
								className='icon-light-grey cursor-pointer'
								onClick={() => enableInput('userEmail')}
							/>
						</div>
					</div>
					<div className='flex flex-col justify-between col-span-2'>
						<div className='bg-white p-4 mb-4 flex flex-col items-start justify-center w-full rounded-lg'>
							<p className='text-[16px] font-semibold text-[#666666]'>
								Workspace Settings
							</p>
							<div className='flex bg-[#FAFAFA] p-3 rounded-md border border-lg-gray mt-5 w-1/2 justify-between items-center'>
								<input
									type='text'
									className=' bg-[#FAFAFA] text-sm text-[#666666] p-2'
									placeholder={'Unread Count'}
									defaultValue={user?.unreadCount}
									disabled={true}
									name='unreadCount'
									id='unreadCount'
									onChange={(e) => {
										setUnreadCount(e.target.value)
									}}
									onBlur={() => disableInput('unreadCount')}
								/>
								<BiPencil
									className='icon-light-grey cursor-pointer'
									onClick={() => enableInput('unreadCount')}
								/>
							</div>
						</div>
						<div className='bg-white p-4 mb-4 flex flex-col items-start justify-center w-full rounded-lg'>
							<p className='text-[16px] font-semibold text-[#666666]'>
								Connected Apps
							</p>
							<p className='text-[12px] text-[#666666]'>
								Connect these accounts and unlock special
								Tweepsbook integration
							</p>
							<div className='flex bg-[#FAFAFA] p-3 rounded-md border border-lg-gray mt-5 w-1/2 justify-start items-center'>
								<img src={twitterIcon.src} alt='' />
								Twitter
							</div>
						</div>
						<div className='bg-white p-4 flex  items-center justify-between w-full rounded-lg'>
							<div className='flex flex-col'>
								<p className='text-[16px] font-semibold text-[#666666]'>
									Account Removal
								</p>
								<p className='text-[12px]  text-[#666666]'>
									We dare you to delete your account
								</p>
							</div>
							<button
								className='text-white text-sm py-2 mx-2 px-4 rounded-lg border-[#B00020] border-2 bg-[#B00020] font-semibold'
								onClick={() =>
									setShowDeleteAccountConfirmation(true)
								}
							>
								Delete Account
							</button>
						</div>
					</div>
				</div>
				<div className='flex justify-end mt-5'>
					<button
						className='bg-white text-sm py-2 mx-2 px-4 rounded-lg border-dark-blue border-2 text-dark-blue font-semibold'
						onClick={() =>
							(window.location.href = '/app/dashboard')
						}
					>
						Cancel
					</button>
					<button
						className='text-white text-sm py-2 mx-2 px-4 rounded-lg border-dark-blue border-2 bg-dark-blue font-semibold'
						onClick={saveUserDetails}
					>
						Save Changes
					</button>
				</div>
			</div>
			{showDeleteAccountConfirmation && (
				<div className='w-full h-full absolute top-0 left-0 bg-sh-gray bg-opacity-80 z-50 flex items-center justify-center'>
					<div className='bg-white p-4 flex flex-col items-center justify-center w-120 rounded-lg'>
						<p className='text-[16px] font-semibold text-[#666666] mb-6'>
							Are your sure you want to delete your account?
						</p>
						<div className='flex '>
							<button
								className='text-white text-sm py-2 mx-2 px-4 rounded-lg border-[#03b000] border-2 bg-[#03b000] font-semibold'
								onClick={() =>
									setShowDeleteAccountConfirmation(false)
								}
							>
								Cancel
							</button>
							<button
								className='text-white text-sm py-2 mx-2 px-4 rounded-lg border-[#B00020] border-2 bg-[#B00020] font-semibold'
								onClick={() => deleteUser()}
							>
								Delete Account
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Settings
