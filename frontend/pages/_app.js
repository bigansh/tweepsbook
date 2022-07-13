import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import '../styles/globals.css'
import Head from 'next/head'
import { BookmarksProvider } from '../contexts/BookmarksContext'
import { UserProvider } from '../contexts/UserContext'

const MyApp = ({ Component, pageProps }) => {
	return (
		<BookmarksProvider>
			<UserProvider>
				<Head>
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

				<Component {...pageProps} />
			</UserProvider>
		</BookmarksProvider>
	)
}

export default MyApp
