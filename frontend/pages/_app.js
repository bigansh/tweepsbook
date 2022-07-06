import '../styles/globals.css'
import Head from 'next/head'
import { BookmarksProvider } from '../contexts/BookmarksContext'

const MyApp = ({ Component, pageProps }) => {
	return (
		<BookmarksProvider>
			<>
				<Head>
					<style>
						@import
						url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');
					</style>
				</Head>

				<Component {...pageProps} />
			</>
		</BookmarksProvider>
	)
}

export default MyApp
