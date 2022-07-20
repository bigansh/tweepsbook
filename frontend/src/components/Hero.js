import Navbar from './Navbar'
import { BsArrowRightShort } from 'react-icons/bs'
import Lottie from 'react-lottie-player'
import LandingAnimation from './landing_animation.json'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
const Hero = () => {
	const { user, getUser } = useContext(UserContext)
	const handleAuth = () => {
		const token = localStorage.getItem('sessionToken')
		if (token) {
			try {
				getUser()
				window.location.href = '/app/dashboard'
			} catch (err) {
				console.log(err)
				window.location.href =
					process.env.NEXT_PUBLIC_HOST +
					`/auth/twitter` +
					'?authorization=' +
					process.env.NEXT_PUBLIC_STATIC_TOKEN
			}
		} else {
			window.location.href =
				process.env.NEXT_PUBLIC_HOST +
				`/auth/twitter` +
				'?authorization=' +
				process.env.NEXT_PUBLIC_STATIC_TOKEN
		}
	}
	return (
		<div className='max-h-[100vh]'>
			<Navbar />
			<div className='md:ml-10 ml-6 mt-4 sm:mt-12 '>
				<div className='md:mx-12 my-4 flex flex-col lg:flex-row align-middle'>
					<div className='flex flex-col items-center sm:items-start my-12 w-full sm:w-2/3'>
						<div className='flex items-center justify-center sm:items-start m-1 p-1 text-dark-blue font-black font-header text-[48px] tracking-wide my-4 leading-tight'>
							<h2>If Notion &amp; Pocket <br /> Had a Baby
							{/* Unr
							<span className='italic'>ea</span>d Book
							<span className='italic'>ma</span>rks
							<span className='italic'>ma</span>rks
							<br />
							Fina<span className='italic'>ll</span>y Ta
							<span className='italic'>me</span>d */}</h2>
						</div>
						<div className=' text-light-blue-text md:w-5/6 font-medium text-[16px] max-w-md'>
							<p>We’d call it <strong>TweepsBook</strong>. A notebook for storing,
							organizing, taking &amp; sharing notes for all your
							favorite bookmarks.</p>
						</div>
						<div className='my-8 sm:my-12 flex flex-col items-center justify-center sm:justify-start sm:flex-row w-[60vw] sm:w-full'>
							<a
								href='https://www.producthunt.com/posts/tweepsbook-mark-organize-note?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tweepsbook&#0045;mark&#0045;organize&#0045;note'
								target='_blank'
							>
								<img
									src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=352538&theme=neutral'
									alt='TweepsBook&#0032;&#0045;&#0032;Mark&#0046;&#0032;Organize&#0046;&#0032;Note&#0046; - If&#0032;Notion&#0032;&#0038;&#0032;Pocket&#0032;Had&#0032;A&#0032;Baby | Product Hunt'
									style={{ height: ' 3rem' }}
								/>
							</a>

							{/* CTA */}
							<button
								className='text-[16px] flex m-2 mx-4 bg-dark-blue hover:bg-hover-blue active:bg-dark-blue shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-100 text-white py-3 px-5 rounded-xl items-center w-[14rem] sm:w-[40%] sm:h-[3rem] justify-center'
								onClick={() => {
									handleAuth()
								}}
							>
								Let's Get Started
								<BsArrowRightShort size={24} />
							</button>
						</div>
					</div>
					<div className=' md:mr-10 mr-6 h-[600px] p-5'>
						<Lottie
							loop
							animationData={LandingAnimation}
							play
							className=' h-full mx-auto'
						/>
						{/* <Image src={hero1}></Image> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero
