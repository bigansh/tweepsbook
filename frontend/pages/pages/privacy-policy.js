import React from 'react'
import Head from 'next/head'
import { AiOutlineClose } from 'react-icons/ai'
import Script from 'next/script'

const privacy = () => {
	return (
		<div className='w-full h-full absolute top-0 left-0 bg-sh-gray bg-opacity-80 z-50 flex items-center justify-center overflow-hidden backdrop-blur-sm'>
			<Head>
				<title>Privacy Policy / TweepsBook</title>
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
			<div className='flex flex-col bg-white shadow-xl w-4/5 rounded-xl p-2 sm:p-12 overflow-y-scroll h-4/5 border-4 border-cyan-400 flow'>
				<h1 className='text-4xl text-[#004964] font-bold text-center mb-11 items-center flex justify-between'>
					<span className='opacity-0'>.</span>
					Privacy Policy
					<AiOutlineClose
						className='icon-grey cursor-pointer ml-2 '
						size={30}
						onClick={() => {
							window.location.href = '/'
						}}
					/>
				</h1>
				<div className='text-md text-gray-600 leading-8'>
					At TweepsBook, accessible from https://tweepsbook.com, one
					of our main priorities is the privacy of our visitors. This
					Privacy Policy document contains types of information
					collected and recorded by TweepsBook and how we use it.
					<br /> If you have additional questions or require more
					information about our Privacy Policy, do not hesitate to
					contact us. <br />
					This Privacy Policy applies only to our online activities
					and is valid for visitors to our website regarding the
					information they shared and/or collected in TweepsBook. This
					policy does not apply to any information collected offline
					or via channels other than this website.
					<br /> <br />
					<h2 className='text-lg font-semibold'>Consent</h2> You
					hereby consent to our Privacy Policy and agree to its terms
					by using our website. <br /> <br />
					<h2 className='text-lg font-semibold'>
						Information we collect
					</h2>
					The personal information you are asked to provide, and the
					reasons why you are asked to provide it, will be clear to
					you at the point we ask you to provide your personal
					information. <br /> If you contact us directly, we may
					receive additional information about you, such as your name,
					email address, phone number, the contents of the message
					and/or attachments you may send us, and any other
					information you may provide. <br /> When you register for an
					Account, we may ask for your contact information, including
					items such as name, company name, address, email address,
					and telephone number. <br /> <br />
					<h2 className='text-lg font-semibold'>
						How we use your information
					</h2>{' '}
					We use the information we collect in various ways,
					including:
					<li>
						Provide, operate, and maintain our website - Improve,
						personalize, and expand our website
					</li>
					<li>Improve, personalize, and expand our website </li>
					<li>Understand and analyze how you use our website</li>
					<li>
						Develop new products, services, features, and
						functionality
					</li>
					<li>
						Communicate with you, either directly or through one of
						our partners, including for customer service, to provide
						you with updates and other information relating to the
						website and for marketing and promotional purposes
					</li>
					<li>Send you emails - Find and prevent fraud</li>
					<br />
					<h2 className='text-lg font-semibold'>Log Files</h2>
					TweepsBook follows a standard procedure of using log files.
					These files log visitors when they visit websites. All
					hosting companies do this and are a part of hosting
					services' analytics. The information collected by log files
					includes internet protocol (IP) addresses, browser type,
					Internet Service Provider (ISP), date and time stamp,
					referring/exit pages, and possibly the number of clicks.
					These are not linked to any personally identifiable
					information. The information aims to analyze trends,
					administer the site, track users' movement on the website,
					and gather demographic information.
					<br /> <br />
					<h2 className='text-lg font-semibold'>Cookies and Web</h2>
					Beacons Like any other website, TweepsBook uses ‘cookies.’
					These cookies store information, including visitors'
					preferences and the pages on the website that the visitor
					accessed or visited. The information is used to optimize the
					users' experience by customizing our web page content based
					on visitors' browser type and/or other information.
					<br /> <br />
					<h2 className='text-lg font-semibold'>
						Advertising Partners Privacy Policies
					</h2>
					You may consult this list to find the Privacy Policy for
					each of the advertising partners of TweepsBook. <br />
					Third-party ad servers or ad networks uses technologies like
					cookies, JavaScript, or Web Beacons that are used in their
					respective advertisements and links that appear on
					TweepsBook, which are sent directly to users' browser. They
					automatically receive your IP address when this occurs.
					These technologies are used to measure the effectiveness of
					their advertising campaigns and/or personalize the
					advertising content you see on websites you visit. <br />
					Note that TweepsBook has no access to or control over these
					cookies that are used by third-party advertisers.
					<br />
					<br />
					<h2 className='text-lg font-semibold'>
						Third Party Privacy Policies
					</h2>
					TweepsBook's Privacy Policy does not apply to other
					advertisers or websites. Thus, we are advising you to
					consult the respective Privacy Policies of these third-party
					ad servers for more detailed information. It may include
					their practices and instructions about how to opt out of
					certain options. <br /> You can choose to disable cookies
					through your browser options. It can be found on the
					browsers' respective websites to know more detailed
					information about cookie management with specific web
					browsers. <br />
					<br />
					<h2 className='text-lg font-semibold'>
						CCPA Privacy Rights (Do Not Sell My Personal
						Information)
					</h2>{' '}
					Under the CCPA, among other rights, California consumers
					have the right to:
					<li>
						Request that a business that collects a consumer's data
						disclose the categories and specific pieces of personal
						data that a business has collected about consumers.
					</li>
					<li>
						Request that a business deletes any personal data about
						the consumer a business has collected.
					</li>
					<li>
						Request that a business that sells a consumer's data not
						sell the consumer's data.
					</li>
					<li>
						If you make a request, we have one month to respond to
						you. Please contact us if you would like to exercise any
						of these rights.
					</li>
					<br />
					<h2 className='text-lg font-semibold'>
						GDPR Data Protection Rights
					</h2>{' '}
					We would like to make sure you are fully aware of all of
					your data protection rights. Every user is entitled to the
					following: <br /> The right to access – You have the right
					to request copies of your data. We may charge you a small
					fee for this service. <br /> The right to rectification –
					You have the right to request that we correct any
					information you believe is inaccurate. You also have the
					right to request that we complete the information you
					believe is incomplete. <br /> The right to erasure – You
					have the right to request that we erase your data under
					certain conditions. <br /> The right to restrict processing
					– You have the right to request that we restrict the
					processing of your data under certain conditions. <br /> The
					right to object to processing – Under certain conditions,
					you have the right to object to our processing of your data.
					<br /> The right to data portability – You have the right to
					request that we transfer the data that we have collected to
					another organization or directly to you under certain
					conditions. <br /> If you make a request, we have one month
					to respond to you. Please contact us if you would like to
					exercise any of these rights. <br /> <br />
					<h2 className='text-lg font-semibold'>
						Children's Information
					</h2>
					Another part of our priority is adding protection for
					children while using the internet. We encourage parents and
					guardians to observe, participate in, and/or monitor and
					guide their online activity. <br /> TweepsBook does not
					knowingly collect any Personal Identifiable Information from
					children under 13. If you think that your child provided
					this kind of information on our website, we strongly
					encourage you to contact us immediately, and we will do our
					best to promptly remove such information from our records.
				</div>
			</div>
		</div>
	)
}

export default privacy
