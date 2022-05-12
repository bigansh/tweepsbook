import Navbar from '../src/components/Navbar'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
