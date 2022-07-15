import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import '../styles/globals.css'
import Head from 'next/head'
import Link from 'next/link'
import { BookmarksProvider } from '../contexts/BookmarksContext'
import { UserProvider } from '../contexts/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Script from 'next/script'

const MyApp = ({ Component, pageProps }) => {
	return (
		<BookmarksProvider>
			<UserProvider>
				<Head>
					<title>TweepsBook - A Notebook For All Your Bookmarks</title>
					<link rel="icon" href="/Logo.ico" />
					<meta property="og:title" content="If Notion & Pocket Had a Baby" key="title" />
					<meta name="description" content="We’d call it TweepsBook. A notebook for storing, organizing, taking & sharing notes for all your favorite bookmarks." />
					<meta property="og:description" content="What Twitter could not do with Twitter Blue, we did it for free. TweepsBook is a better bookmarking tool that allows you to import, organize, take, & share notes on all your “gyan-worthy” bookmarks." />
					<meta property="og:image" content="https://i.postimg.cc/Qd2WknqK/Message-Header.png" />
					<Script async src="https://www.googletagmanager.com/gtag/js?id=G-J0QPJQF85V"></Script>
					<link
						rel='preconnect'
						href='https://fonts.googleapis.com'
					/>
					<link
						rel='preconnect'
						href='https://fonts.gstatic.com'
						crossOrigin
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<ToastContainer
					position='bottom-center'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='dark'
				/>
				<Component {...pageProps} />
			</UserProvider>
		</BookmarksProvider>
	)
}

export default MyApp
