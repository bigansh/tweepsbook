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
				<Head></Head>

				<Component {...pageProps} />
			</UserProvider>
		</BookmarksProvider>
	)
}

export default MyApp
