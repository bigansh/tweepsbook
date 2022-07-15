import Hero from '../src/components/Hero'
import Head from 'next/head'
import Script from 'next/script'

const Home = () => {

	return (
		<>
			<Head>
				<title>TweepsBook - A Notebook For All Your Bookmarks</title>
				<meta property="og:title" content="If Notion & Pocket Had a Baby" key="title" />
				<meta name="description" content="We’d call it TweepsBook. A notebook for storing, organizing, taking & sharing notes for all your favorite bookmarks." />
				<meta property="og:description" content="What Twitter could not do with Twitter Blue, we did it for free. TweepsBook is a better bookmarking tool that allows you to import, organize, take, & share notes on all your “gyan-worthy” bookmarks." />
				<meta property="og:image" content="https://i.postimg.cc/Qd2WknqK/Message-Header.png" />
				<Script async src="https://www.googletagmanager.com/gtag/js?id=G-J0QPJQF85V"></Script>
				{/* <Script>
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments)}
					gtag('js', new Date());

					gtag('config', 'G-J0QPJQF85V')
				</Script> */}
				{/* <Script>
					!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked = !0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="1t7Yw2EonU8mBWTA6X0FQNphh5fhN6Ah";;analytics.SNIPPET_VERSION="4.15.3";
					analytics.load("1t7Yw2EonU8mBWTA6X0FQNphh5fhN6Ah");
					analytics.page();}}()
				</Script> */}
			</Head>

			<Hero />
		</>
	)
}

export default Home
