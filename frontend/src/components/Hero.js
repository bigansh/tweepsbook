import Navbar from './Navbar'
import { BsArrowRightShort } from 'react-icons/bs'
import { AiFillGithub, AiFillTwitterCircle } from 'react-icons/ai'
import Lottie from 'react-lottie-player'
import LandingAnimation from './landing_animation.json'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Modal from './Modal'
import { useRouter } from 'next/router'
import PrivacyPolicy from '../../pages/pages/privacy-policy'
import TOS from '../../pages/pages/terms-of-service'
const Hero = () => {
	const router = useRouter()
	const query = router.query
	console.log(query)
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
			{query.page === 'privacy-policy' && <PrivacyPolicy />}
			{query.page === 'terms-of-service' && <TOS />}
			<div className='md:ml-10 sm:ml-6 mt-4 sm:mt-12 '>
				<div className='md:mx-12 flex flex-col lg:flex-row sm:align-middle'>
					<div className='flex flex-col items-center sm:items-start my-16 w-full sm:w-2/3'>
						<h2 className='text-center sm:text-justify mx-2 sm:m-1 p-1 text-dark-blue font-black font-header text-[48px] tracking-wide my-4 sm:leading-tight'>
							If Notion &amp; Pocket <br /> Had a Baby
						</h2>

						<p className='text-center sm:text-left mx-2 sm:m-1 text-light-blue-text md:w-5/6 font-medium text-[16px] max-w-md'>
							We’d call it <strong>TweepsBook</strong>. A notebook
							for storing, organizing, taking &amp; sharing notes
							for all your favorite bookmarks.
						</p>

						<div className='my-8 mb-2 sm:my-12 flex flex-col items-center justify-center sm:justify-start sm:flex-row w-[60vw] sm:w-full'>
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
								className='text-[16px] flex m-2 mx-4 bg-dark-blue hover:bg-hover-blue active:bg-dark-blue shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-100 text-white py-3 px-5 rounded-xl items-center w-[14rem] sm:w-[15rem] sm:h-[3rem] justify-center'
								onClick={() => {
									handleAuth()
								}}
							>
								Let's Get Started
								<BsArrowRightShort size={24} />
							</button>
						</div>
						<div className='flex w-full p-1 justify-end sm:hidden'>
							<div className='mr-3 '>
								<a
									href='https://twitter.com/tweepsbookcom'
									target='_blank'
								>
									<AiFillTwitterCircle
										size={36}
										style={{ color: '#1DA1F2' }}
									/>
								</a>
							</div>
							<div>
								<a
									href='https://github.com/bigansh/tweepsbook'
									target='_blank'
								>
									<AiFillGithub size={36} />
								</a>
							</div>
						</div>
					</div>
					<div className=' md:mr-10 mr-6 h-[600px] p-5'>
						<Lottie
							loop
							animationData={LandingAnimation}
							play
							className=' h-full mx-auto'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero
