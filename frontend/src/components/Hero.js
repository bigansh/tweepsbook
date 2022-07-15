import Image from 'next/image'
import Navbar from './Navbar'
import hero1 from '../images/hero_image_1.png'
import { BsArrowRightShort } from 'react-icons/bs'
import Lottie from 'react-lottie-player'
import LandingAnimation from './landing_animation.json'
const Hero = () => {
	return (
		<div className='max-h-[100vh]'>
			<Navbar />
			<div className='md:ml-10 ml-6 mt-12 '>
				<div className='md:mx-12 my-4 flex flex-col lg:flex-row align-middle'>
					<div className=' my-12 w-2/3'>
						<h2 className='text-dark-blue font-black font-serif text-[48px] tracking-wide my-4'>
							If Notion &amp; Pocket <br /> Had a Baby
							{/* Unr
							<span className='italic'>ea</span>d Book
							<span className='italic'>ma</span>rks
							<br />
							Fina<span className='italic'>ll</span>y Ta
							<span className='italic'>me</span>d */}
						</h2>
						<p className='text-light-blue-text md:w-5/6 font-medium text-[16px]'>
							We’d call it TweepsBook. A notebook for storing,
							organizing, taking &amp; sharing notes for all your
							favorite bookmarks.
						</p>
						<div className='my-12 py-6 flex'>
							<a
								href='https://www.producthunt.com/posts/tweepsbook-mark-organize-note?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tweepsbook&#0045;mark&#0045;organize&#0045;note'
								target='_blank'
							>
								<img
									src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=352538&theme=neutral'
									alt='TweepsBook&#0032;&#0045;&#0032;Mark&#0046;&#0032;Organize&#0046;&#0032;Note&#0046; - If&#0032;Notion&#0032;&#0038;&#0032;Pocket&#0032;Had&#0032;A&#0032;Baby | Product Hunt'
									style={{ width: '250px', height: ' 54px' }}
									width='250'
									height='54'
								/>
							</a>

							{/* CTA */}
							<button
								className='text-[16px] bg-dark-blue hover:bg-hover-blue active:bg-dark-blue ml-4 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-100 text-white py-3 px-5 rounded-xl flex items-center content-center'
								onClick={() => {
									window.open(
										process.env.NEXT_PUBLIC_HOST +
											`/auth/twitter` +
											'?authorization=' +
											process.env.NEXT_PUBLIC_STATIC_TOKEN
									)
									// console.log(process.env)
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
